var cnt = 1;
	$(document).ready(function(){
		// 클릭버튼이 클릭이 되면
		$('#check').click(function(){
			// 아이디값을 불러와서 변수에 저장시키고
			var sid = $('#id').val();
			
			// 아이디 	: 5 ~ 10 글자 소문자와 숫자 , 시작은 소문자
			// 아이디 유효성 검사
			var idPattern = /^[a-z][a-z0-9]{4,9}$/;
			var idResult = idPattern.test(sid);
			// 아이디가 형식에 맞지 않는 경우
			if(!idResult){
				$('#id').val('');
				$('#id').focus();
				$('#idmsg').html('');
				alert('아이디가 형식에 맞지 않습니다 ! ');
				return;
			} else {
				$.ajax({
					url: '/chopa/member/idCheck.chp',
					type: 'post',
					dataType: 'json',
					data: {
						id: sid
					},
					success : function(data){
						if(data.result == 'OK'){
							$('#idmsg').html(' 사용가능한 아이디입니다 ! ');
							$('#idmsg').removeClass('w3-text-red').addClass('w3-text-green');
						} else {
							$('#idmsg').html(' 사용할 수 없는 아이디입니다 ! ');
							$('#idmsg').removeClass('w3-text-green').addClass('w3-text-red');
						}
					},
					error: function(){
						alert(' ** 통신 오류 ** ');
					}
				});
			}
		});
		
		// 비밀번호가 같은지 다른지 확인
		$('#repw').keyup(function(){
			if($('#repw').val() != $('#pw').val()){
				$('#pwmsg').html(' 비밀번호가 다릅니다. ');
				$('#pwmsg').removeClass('w3-text-blue').addClass('w3-text-red');
			}	else {
				$('#pwmsg').html(' 비밀번호확인이 끝났습니다.');
				$('#pwmsg').removeClass('w3-text-red').addClass('w3-text-blue');
			}
		});
		// filefr 이 클릭되면
		$('#filefr').on('change', '.file', function(evt){
			var sfile = $(this).val();
			if(!sfile){ 
				// 선택 취소 태그 삭제
				var fid = $(this).attr('id');
				fid = fid.substring(4);
				$('#file' + fid).remove();
				$('#image' + fid).parent().parent().remove();
				// 파일이 다 삭제되면 미리보기 창 닫기
				var preViewS = $('img').length - 6;
					if(preViewS == 0){
					$('#preView').slideUp(500);
				}
				return;
			}
			// 파일 추가
			var no = cnt;
			var path = URL.createObjectURL(evt.target.files[0]);
			$('#preView').stop().slideUp(500, function(){
				addTag(path, no);
				$('#preView').slideDown(500);
			});
			$('#filefr').append('<input type="file" name="file" id="file' + ++cnt + 
									'" class="w3-input w3-border w3-round-medium file" placeholder="이미지 파일 선택!">');
		});
		
		function addTag(path, no){
			var tag = 	'<div class="inblock box100 w3-border mgl10 mgb10 w3-card-4">' +
							'<div class="w3-col w3-border imgbox mgl10 mgt10">' +
								'<img class="img1" id="image' + no + '" src="' + path + '">' +
							'</div>' +
						'</div>';
			$('#imgfr').append(tag);
		};
		
		// 아바타 성별을 누르고 바뀌면 그 값에 맞는 아바타 보여주기
		$('.gen').change(function(){
			var cgen = $(this).val();
			$('#avatar').slideUp(300, function(){
				if(cgen == 'male'){
					$('#favt').css('display', 'none');
					$('#mavt').css('display', 'block');
				} else {
					$('#favt').css('display', 'block');
					$('#mavt').css('display', 'none');
				}
				$('#avatar').slideDown(300);
			});
		});
		
		// join 버튼이 클릭이 되면
		$('#join').click(function(){
			// 이름의 데이터 값 불러오기
			var sname = $('#name').val();
			// 이름이 입력이 안 된 경우
			if(!sname){
				$('#name').focus();
				alert('이름을 입력하세요 !');
				return;
			}
			// 이름 	: 2 ~ 10글자 한글
			// 이름 정규표현식 패턴 정해주기
			var namePattern = /^[가-힣]{2,8}$/;
			var nameResult = namePattern.test(sname);
			// 이름이 형식에 맞지 않는 경우
			if(!nameResult){
				$('#name').val('');
				$('#name').focus();
				alert('이름이 형식에 맞지 않습니다 !');
				return;
			}
			
			// 아이디 데이터 값 불러오기
			var sid = $('#id').val();
			// 아이디가 입력이 안 된 경우
			if(!sid){
				$('#id').focus();
				alert('아이디를 입력하세요 !');
				return;
			}
			// 아이디 	: 5 ~ 10 글자 소문자와 숫자 , 시작은 소문자
			// 아이디 정규표현식 패턴 정해주고 검사하기
			var idPattern = /^[a-z][a-z0-9]{4,9}$/;
			var idResult = idPattern.test(sid);
			// 아이디가 형식에 맞지 않는 경우
			if(!idResult){
				$('#id').val('');
				$('#id').focus();
				alert('아이디가 형식에 맞지 않습니다 !');
				return;
			}
			
			// 비밀번호 데이터 값 불러오기
			var spw = $('#pw').val();
			// 비밀번호가 입력이 안 된 경우
			if(!spw){
				$('#pw').focus();
				alert('비밀번호를 입력하세요 !');
				return;
			}
			// 비밀번호 : 5 ~ 8글자, 대소문자, 숫자, #%*_!?는 사용가능하고 반드시 한개는 포함해야한다.
			// 비밀번호 유효성 검사
			var pwPattern = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#%*!?]))[a-zA-Z0-9#%*!?]{5,8}$/
			var pwResult = pwPattern.test(spw);
			// 비밀번호가 형식에 맞지 않는 경우
			if(!pwResult){
				$('#pw').val('');
				$('#repw').val('');
				$('#pw').focus();
				alert(' 비밀번호가 형식에 맞지 않습니다 !');
				return;
			}
			// 비밀번호 창 두개의 값이 다른 경우
			if($('#pw').val() != $('#repw').val() ){
				$('#pw').val('');
				$('#repw').val('');
				$('#pw').focus();
				alert(' 비밀번호가 다릅니다 !');
				return;
			}
			
			// 메일 데이터 값 불러오기
			var smail = $('#mail').val();
			// 메일이 입력이 안 된 경우
			if(!smail){
				$('#mail').focus();
				alert(' 메일을 입력하세요 !');
				return;
			}
			//메일 	: 아이디는 소문자 + 숫자 로 4 ~ 10 글자 메일형식 정규표현식 검사를 따른다.
			// 메일 유효성 검사
			var mailPattern = /^[a-z0-9]{4,10}@[a-z_]{3,12}[.][a-z]{2,3}(\.[a-z]{0,2})?$/;
			var mailResult = mailPattern.test(smail);
			// 메일 형식이 맞지 않는 경우
			if(!mailResult){
				$('#mail').val('');
				$('#mail').focus();
				alert(' 이메일 형식에 맞지 않습니다 ! ');
				return;
			}
			// 전화번호 데이터 값 불러오기
			var sphone = $('#phone').val();
			// 전화번호가 입력이 안 된 경우
			if(!sphone){
				$('#phone').focus();
				alert(' 전화번호를 입력하세요 ! ');
				return;
			}
			// 전화번호 : "숫자3-숫자3 ~ 4글자-숫자4글자" 형식으로 되어야 한다.
			// 전화번호 유효성 검사
			var phonePattern = /^0[0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/;
			var phoneResult = phonePattern.test(sphone);
			// 전화번호가 형식이 맞지 않는 경우
			if(!phoneResult){
				$('#phone').val('');
				$('#phone').focus();
				alert(' 전화번호가 형식에 맞지 않습니다 ! ');
				return;
			}
			alert('유효성 검사 완료');
		});
	});