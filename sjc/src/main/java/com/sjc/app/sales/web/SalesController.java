package com.sjc.app.sales.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sjc.app.sales.service.CpVO;
import com.sjc.app.sales.service.OrderVO;
import com.sjc.app.sales.service.PrdManagementVO;
import com.sjc.app.sales.service.ProductVO;
import com.sjc.app.sales.service.SalesDTO;
import com.sjc.app.sales.service.SalesService;
import com.sjc.app.sales.service.outHistoryVO;

@Controller
public class SalesController {

	private SalesService salesService;

	@Autowired
	SalesController(SalesService salesService) {
		this.salesService = salesService;
	}

	// 주문접수 페이지
	@GetMapping("/orderReception")
	public String orderReceptionPage(Model model) {
		List<ProductVO> productList = salesService.productList();
		List<CpVO> cpList = salesService.cpList();

		model.addAttribute("products", productList);
		model.addAttribute("cpList", cpList);
		model.addAttribute("orderVO", new OrderVO());

		return "sales/orderReception";
	}
	
	// 주문접수 프로세스
	@PostMapping("/orderReception")
	public String insertOrder(@RequestBody SalesDTO salesDTO) {
		int orderResult = salesService.insertOrder(salesDTO);
	    return "redirect:/main";
	}
	
	
	
	// 주문내역 페이지 이동
	@GetMapping("/orderHistory")
	public String orderHistoryPage() {
		return "sales/orderHistory";
	}
	
	// 주문내역 페이지 주문 목록
	@GetMapping("/getOrder")
	@ResponseBody
	public List<OrderVO> getOrder() {
	    return salesService.order();
	}
	
	// 주문내역 상세페이지
	@PostMapping("/getOrderDetail")
	@ResponseBody
	public List<Map<String, Object>> getOrderDetail(@RequestBody Map<String, String> requestData) {
		String ordCode = requestData.get("ordCode");
		List<Map<String, Object>> ordDetail = salesService.orderDetail(ordCode);
		
		return ordDetail;
	}
	
	// 주문내역 검색 프로세스
	@PostMapping("/searchOrder")
	@ResponseBody
	public List<OrderVO> searchOrder(@RequestBody Map<String, Object> request) {
	    String companyName = (String) request.get("companyName");
	    String orderStartDate = (String) request.get("orderStartDate");
	    String orderEndDate = (String) request.get("orderEndDate");
	    String deliveryStartDate = (String) request.get("deliveryStartDate");
	    String deliveryEndDate = (String) request.get("deliveryEndDate");
	    String orderStatus = (String) request.get("orderStatus");
	    
	    return salesService.searchOrder(companyName, orderStartDate, orderEndDate, deliveryStartDate, deliveryEndDate, orderStatus);
	}
	
	
	
	// 주문내역 삭제 페이지 주문 목록
	@GetMapping("/getDeleteOrder")
	@ResponseBody
	public List<OrderVO> getDeleteOrder() {
	    return salesService.deleteOrderList();
	}
	
	// 주문내역 삭제 프로세스
	@PostMapping("/orderDelete")
	@ResponseBody
	public int deleteOrder(@RequestBody Map<String, List<String>> payload) {
	    List<String> ordCodes = payload.get("orderVO");
	    return salesService.deleteOrder(ordCodes);
	}
	
	
	
	// 제품출고 프로세스
	@PostMapping("/getPrdOutInfo")
	@ResponseBody
	public int prdOutProcess(@RequestBody Map<String, List<Map<String, Object>>> requestData) {
		
	    List<Map<String, Object>> outLotData = requestData.get("outLotData");
	    List<Map<String, Object>> outPrdData = requestData.get("outPrdData");
	    
	    Map<String, Object> combinedData = new HashMap<>();
	    combinedData.put("outLotData", outLotData);
	    combinedData.put("outPrdData", outPrdData);
	    
	    int result = salesService.productOutProcess(combinedData);
	    
	    return result;
	}
	
	// 출고내역 상세페이지
	@PostMapping("/getOutDetail")
	@ResponseBody
	public List<Map<String, Object>> getOutDetail(@RequestBody Map<String, String> requestData) {
		String ordCode = requestData.get("ordCode");
		List<Map<String, Object>> outDetail = salesService.outDetail(ordCode);
		
		return outDetail;
	}
	

	
	// 제품관리 페이지
	@GetMapping("/productManagement")
	public String productManagementPage(Model model) {
		List<ProductVO> productList = salesService.productManagement();
		List<ProductVO> productLotList = salesService.productLot();
		model.addAttribute("products", productList);
		model.addAttribute("productManagement", productLotList);

		return "sales/productManagement";
	}
	
	// 제품관리 상세페이지
	@PostMapping("/getProductDetail")
	@ResponseBody
	public List<Map<String, Object>> getProductDetail(@RequestBody Map<String, String> requestData) {
		String prdCode = requestData.get("prdCode");
		
		List<Map<String, Object>> prdDetail = salesService.productDetail(prdCode);
		
		return prdDetail;
	}

	
	
	// 제품출고현황 페이지
	@GetMapping("/productOut")
	public String productOutPage(Model model) {
		return "sales/productOut";
	}
	
	// 제품출고 상세페이지
	@PostMapping("/getOrdDetail")
	@ResponseBody
	public List<Map<String, Object>> getOrdDetail(@RequestBody Map<String, String> requestData) {
	    String ordCode = requestData.get("ordCode");
	    return salesService.orderDetail(ordCode);
	}
	

	

	// 입/출고 내역 페이지
	@GetMapping("/inoutHistory")
	public String inoutHistoryPage(Model model) {
		
		List<PrdManagementVO> inList = salesService.inHistory();
		model.addAttribute("inHistory", inList);
		List<outHistoryVO> outList = salesService.outHistory();
		model.addAttribute("outHistory", outList);
		
		return "sales/inoutHistory";
	}
	
	// 입고 내역 검색 페이지
	@PostMapping("/inSearch")
	@ResponseBody
	public List<PrdManagementVO> inSearch(@RequestBody Map<String, Object> request) {
	    String prdName = (String) request.get("prdName");
	    String inStartDate = (String) request.get("inStartDate");
	    String inEndDate = (String) request.get("inEndDate");
	   
	    return salesService.inSearch(prdName, inStartDate, inEndDate);
	}
	
	// 출고 내역 검색 페이지
	@PostMapping("/outSearch")
	@ResponseBody
	public List<outHistoryVO> outSearch(@RequestBody Map<String, Object> request) {
	    String prdName = (String) request.get("prdName");
	    String cpName = (String) request.get("cpName");
	    String outStartDate = (String) request.get("outStartDate");
	    String outEndDate = (String) request.get("outEndDate");
	    
	    return salesService.outSearch(prdName, cpName, outStartDate, outEndDate);
	}
	
	// 제품출고 상세페이지 LOT
	@PostMapping("/getPrdLotDetail")
	@ResponseBody
	public List<Map<String, Object>> getPrdLotDetail(@RequestBody Map<String, String> requestData) {
		String prdCode = requestData.get("prdCode");
		List<Map<String, Object>> prdDetail = salesService.productDetail(prdCode);
		return prdDetail;
	}
	
	
	
	// 주문접수 상태의 주문 목록
	@GetMapping("/getOrders")
	@ResponseBody
	public List<OrderVO> getOrders() {
	    return salesService.getOrdersByStatus("주문접수");
	}
	
	// 출고완료 상태의 주문 목록
	@GetMapping("/getOutOrders")
	@ResponseBody
	public List<OrderVO> getOutOrders() {
	    return salesService.getOrdersByStatus("출고완료");
	}

}
