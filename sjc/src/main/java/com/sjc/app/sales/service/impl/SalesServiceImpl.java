package com.sjc.app.sales.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sjc.app.sales.mapper.SalesMapper;
import com.sjc.app.sales.service.CpVO;
import com.sjc.app.sales.service.OrderVO;
import com.sjc.app.sales.service.PrdManagementVO;
import com.sjc.app.sales.service.ProductVO;
import com.sjc.app.sales.service.SalesDTO;
import com.sjc.app.sales.service.SalesService;
import com.sjc.app.sales.service.outHistoryVO;

import io.micrometer.core.instrument.MeterRegistry;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service 
public class SalesServiceImpl implements SalesService {
	private SalesMapper salesMapper;
	
	@Autowired
	SalesServiceImpl(SalesMapper salesMapper, MeterRegistry registry) {
		this.salesMapper = salesMapper;
	}
	
	// 업체 검색
	@Override
	public List<CpVO> cpList() {
		return salesMapper.selectCp();
	}
	
	// 주문접수 프로세스
	@Transactional
	@Override
	public int insertOrder(SalesDTO salesDTO) {
	    // 키 생성
	    String nextId = salesMapper.getOrdCode();
	    String ordCode = String.valueOf(nextId);
	    
	    // 주문 마스터 등록
	    OrderVO orderVO = salesDTO.getOrderVO();
	    orderVO.setOrdCode(ordCode);
	    
	    // 주문 디테일 등록을 위한 제품 리스트 가져오기
	    List<ProductVO> productVOList = salesDTO.getProductVO(); 
	    
	    // 주문 상태 초기화
	    String orderStatus = "주문접수"; // 기본 상태

	    // 주문 상태 업데이트
	    orderVO.setOrdStatus(orderStatus);
	    int orderResult = salesMapper.insertOrder(orderVO);
	    
	    // 주문 디테일 등록
	    if(orderResult > 0) {
	        productVOList.forEach(productVO -> {
	            salesMapper.insertOrderDetail(productVO, ordCode);
	        });
	    }
	    
	    // 각 제품에 대해 재고량 체크
	    for (ProductVO productVO : productVOList) {
	        String prdCode = productVO.getPrdCode();
	        
	        // 총 주문량 계산
	        int totalOrderQuantity = salesMapper.getTotalOrderQuantity(prdCode, ordCode);
	        
	        // 재고량 계산
	        int stockQuantity = salesMapper.getStockQuantity(prdCode);
	        
	        // 재고량 부족 시 상태 변경
	        if (stockQuantity < totalOrderQuantity) {
	            orderStatus = "재고부족"; // 재고가 부족할 경우 상태 변경
	            salesMapper.updateOrdStatus(orderStatus, ordCode);
	        }
	    }
	    
	    return 1;
	}
	
	
	// 주문내역 조회
	@Override
	public List<OrderVO> order() {
		return salesMapper.selectOrder();
	}
	
	// 주문내역 상세 조회
	@Override
	public List<Map<String, Object>> orderDetail(String ordCode) {
		
		List<Map<String, Object>> list = salesMapper.selectOrderDetail(ordCode);
		
		return list;
	}
	
	// 주문내역 검색
	@Override
	public List<OrderVO> searchOrder(String companyName, String orderStartDate, String orderEndDate, String deliveryStartDate, String deliveryEndDate, String orderStatus) {
		 return salesMapper.searchOrder(companyName, orderStartDate, orderEndDate, deliveryStartDate, deliveryEndDate, orderStatus);
	}
	
	// 주문내역 삭제 조회
	@Override
	public List<OrderVO> deleteOrderList() {
		return salesMapper.selectDeleteOrder();
	}
	
	// 주문내역 삭제
	@Override
	public int deleteOrder(List<String> ordCodes) {
		
		int totalDeletedCount = 0;
	    
	    for (String ordCode : ordCodes) {
	    	totalDeletedCount = salesMapper.deleteOrder(ordCode);
	    }
	    
	    return totalDeletedCount;
	    
	}


	
	// 출고 화면
	@Override
	public List<OrderVO> getOrdersByStatus(String status) {
		return salesMapper.selectOrdersByStatus(status);
	}
	
	// 출고접수 프로세스
	@Transactional
	@Override
	public int productOutProcess(Map<String, Object> data) {
		
		int totalRowsAffected = 0;
		
		String ordCode = null;
		
		// LOT별 제품 출고 프로세스
		List<Map<String, Object>> outLotData = (List<Map<String, Object>>) data.get("outLotData");
		for(Map<String, Object> lot : outLotData) {
			String prdCode = (String) lot.get("prdCode");
			ordCode = (String) lot.get("ordCode");
			String lotNumber = (String) lot.get("lot");
			String cpName = (String) lot.get("cpName");
			String manager = (String) lot.get("manager");
			int outQuantity = (Integer) lot.get("outQuantity");
			
			totalRowsAffected += salesMapper.insertOutHistory(ordCode, prdCode, lotNumber, outQuantity, cpName, manager);
			totalRowsAffected += salesMapper.prdLotOutProcess(outQuantity, lotNumber);
		}
		
		salesMapper.updateOrdFinish(ordCode);
		salesMapper.updateOrdOutDate(ordCode);
		
		return totalRowsAffected;
	}
	
	// 제품조회
	@Override
	public List<ProductVO> productList() {
		return salesMapper.selectProduct();
	}
	
	// 제품관리 페이지
	@Override
	public List<ProductVO> productManagement() {
		return salesMapper.selectProductManagement();
	}
	
	// 제품상세 조회
	@Override
	public List<Map<String, Object>> productDetail(String prdCode) {
		return salesMapper.selectProductDetail(prdCode);
	}
	
	// 출고내역 상세
	@Override
	public List<Map<String, Object>> outDetail(String ordCode) {
		
		List<Map<String, Object>> list = salesMapper.selectOutDetail(ordCode);
		
		return list;
	}
	
	// 제품 LOT
	@Override
	public List<ProductVO> productLot() {
		return salesMapper.selectProductLot();
	}
	
	// 입고내역
	@Override
	public List<PrdManagementVO> inHistory() {
		return salesMapper.selectInHistory();
	}
	
	// 입고 내역 검색 프로세스
	@Override
	public List<PrdManagementVO> inSearch(String prdName, String inStartDate, String inEndDate) {
		return salesMapper.inSearch(prdName, inStartDate, inEndDate);
	}
	
	// 출고내역
	@Override
	public List<outHistoryVO> outHistory() {
		return salesMapper.selectOutHistory();
	}
	
	// 출고 내역 검색 프로세스
	@Override
	public List<outHistoryVO> outSearch(String prdName, String cpName, String outStartDate, String outEndDate) {
		return salesMapper.outSearch(prdName, cpName, outStartDate, outEndDate);
	}

}
