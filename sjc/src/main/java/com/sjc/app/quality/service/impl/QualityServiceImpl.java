package com.sjc.app.quality.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjc.app.quality.mapper.QualityMapper;
import com.sjc.app.quality.service.MtlOdVO;
import com.sjc.app.quality.service.QualityService;

@Service
public class QualityServiceImpl implements QualityService{
	private QualityMapper qualityMapper;
	
	@Autowired
	public QualityServiceImpl (QualityMapper qualityMapper) {
		this.qualityMapper = qualityMapper;
	}

	@Override
	public List<MtlOdVO> incomingWaitInfo() {
		return qualityMapper.selectQualityWaitInfo();
	}

}