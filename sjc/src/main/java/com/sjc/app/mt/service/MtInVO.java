package com.sjc.app.mt.service;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MtInVO {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd HH:mm", timezone = "Asia/Seoul")
    private Date inputDate;       // 입고일
	
    private Integer inquantity;    // 입고수량
    private Integer livecount;     // 변동수량
    private Date ed;               // 유통기한
    private String inCode;         // 입고코드
    private Integer userId;        // 유저아이디
    private String mtlOdCode;      // 자재 발주 코드
    private String insCode;        // 품질 검사 코드
    private String mtCode;         // 자재 코드
    private String cpCode;         // 업체 코드
    private String comm;           // 비고
    private String lotNo;          // LOT 번호
    private String mtName;         // 자재 이름
    private String mtlOdDetailCode;
}
