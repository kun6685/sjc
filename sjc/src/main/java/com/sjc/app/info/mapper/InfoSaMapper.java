package com.sjc.app.info.mapper;

import java.util.List;

import com.sjc.app.info.service.OrdDTO;

public interface InfoSaMapper {
	
	List<OrdDTO> selectOrderCount();
}
