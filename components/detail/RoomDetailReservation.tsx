import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from '../common/DatePicker';
import palette from '../../styles/palette';
import Button from '../common/Button';
import { useSelector } from '../../store';
import OutsideClickHandler from 'react-outside-click-handler';
import Counter from '../common/Counter';
import useModal from '../../hooks/useModal';
import AuthModal from '../auth/AuthModal';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { makeReservationAPI } from '../../lib/networkApi/reservation';
import Router from 'next/router';

const Container = styled.div`
  position: sticky;
  top: 128px;
  padding: 24px 24px 16px;
  width: 362px;
  height: fit-content;
  background-color: white;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;

  .room-detail-reservation-info {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  .room-detail-reservation-inputs {
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid ${palette.gray_71};
    border-radius: 8px;

    .room-detail-reservation-date-inputs {
      position: relative;
      display: flex;
      width: 100%;
      height: 56px;
      border-bottom: 1px solid ${palette.gray_71};

      .room-detail-reservation-check-in {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 8px 0 0 0;
        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 8px 0 0 0;
          cursor: pointer;
          border-right: 1px solid ${palette.gray_71};
          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }
      .room-detail-reservation-check-out {
        position: relative;
        width: 50%;
        height: 100%;
        top: 0;
        right: 0;
        border-radius: 8px 0 0 0;
        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 0 8px 0 0;
          cursor: pointer;
          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }
    }
    .room-detail-reservation-guests-count-wrapper {
      position: relative;
      .room-detail-reservation-guests-count {
        width: 100%;
        height: 56px;
        border-radius: 0 0 8px 8px;
        padding: 10px 12px;
        cursor: pointer;
        span {
          display: block;
          font-size: 10px;
          font-weight: 600;
          margin-bottom: 7px;
        }
        p {
          font-size: 14px;
          color: ${palette.gray_71};
        }
      }
      .room-detail-reservation-guests-popup {
        position: absolute;
        width: 100%;
        top: 60px;
        left: 0;
        padding: 16px;
        background-color: white;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
        cursor: default;

        .room-detail-reservation-guests-info {
          font-size: 14px;
          margin-top: 24px;
          color: ${palette.gray_71};
        }
      }
      .mb-24 {
        margin-bottom: 24px;
      }
    }
  }
  .room-detail-reservation-price-date {
    margin-top: 24px;
    margin-bottom: 16px;
    span {
      float: right;
    }
  }
  .room-detail-reservation-total-price {
    padding-top: 24px;
    border-top: 1px solid ${palette.gray_dd};
    font-size: 16px;
    font-weight: 800;
    span {
      float: right;
    }
  }
`;

const RoomDetailReservation: React.FC = () => {
  const dispatch = useDispatch();
  const room = useSelector(state => state.room.detail);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  const [guestCountPopupOpened, setGuestCountPopupOpened] = useState(false);

  const userId = useSelector(state => state.user.id);

  const { openModal, ModalPortal, closeModal } = useModal();

  //숙소 예약버튼을 클릭했을때 startDate가 없다면 체크인 DatePicker에 focus가 가도록하고
  //startDate를 선택하면 endDate의 DatePicker에 포커스가 자동으로 가도록하겠다.
  const checkInRef = useRef<HTMLLabelElement>(null);
  const checkOutRef = useRef<HTMLLabelElement>(null);

  //예약하기 클릭시
  const onClickReservationButton = async () => {
    if (checkInRef.current && !startDate) {
      checkInRef.current.focus();
    } else if (checkOutRef.current && !endDate) {
      checkOutRef.current.focus();
    }
    //예약하기를 위한 값이 입력되어있는데, 로그인이 안되있을경우 회원가입팝업노출
    if (startDate && endDate && !userId) {
      dispatch(authActions.setAuthMode('login'));
      openModal();
    } else {
      try {
        const body = {
          roomId: room?.id,
          userId,
          checkInDate: startDate!.toISOString(),
          checkOutDate: endDate!.toISOString(),
          adultCount,
          childrenCount,
          infantsCount,
        };
        await makeReservationAPI(body);
        alert('숙소 등록을 완료하였습니다.');
        Router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getGuestCountText = useMemo(() => {
    return `게스트 ${adultCount + childrenCount}명 ${
      infantsCount ? `, 유아 ${infantsCount}명` : ''
    }`;
  }, [adultCount, childrenCount, infantsCount]);

  if (!room) {
    return null;
  }
  return (
    <Container>
      <p className="room-detail-reservation-info">
        요금을 확인하려면 날짜를 입력하세요.
      </p>
      <div className="room-detail-reservation-inputs">
        <div className="room-detail-reservation-date-inputs">
          <div className="room-detail-reservation-check-in">
            <label ref={checkInRef}>
              체크인
              <DatePicker
                placeholderText="날짜추가"
                popperPlacement="top-end"
                selected={startDate}
                onChange={date => setStartDate(date as Date)}
                // openToDate={new Date()}
                selectsStart
                startDate={new Date(startDate as Date)}
                endDate={new Date(endDate as Date)}
                minDate={new Date(room.startDate!)}
                maxDate={new Date(room.endDate!)}
              />
            </label>
          </div>
          <div className="room-detail-reservation-check-out">
            <label ref={checkOutRef}>
              체크아웃
              <DatePicker
                placeholderText="날짜추가"
                popperPlacement="top-end"
                selected={endDate}
                onChange={date => setEndDate(date as Date)}
                selectsEnd
                // openToDate={new Date()}
                startDate={startDate as Date}
                endDate={new Date(endDate as Date)}
                minDate={new Date(room.startDate!)}
                maxDate={new Date(room.endDate!)}
              />
            </label>
          </div>
        </div>
        <div className="room-detail-reservation-guests-count-wrapper">
          <OutsideClickHandler
            onOutsideClick={() => {
              setGuestCountPopupOpened(false);
            }}
          >
            <div
              role={'presentation'}
              className="room-detail-reservation-guests-count"
              onClick={() => setGuestCountPopupOpened(!guestCountPopupOpened)}
            >
              <span>인원</span>
              <p>{getGuestCountText}</p>
            </div>
            {guestCountPopupOpened && (
              <div className="room-detail-reservation-guests-popup">
                <div className="mb-24">
                  <Counter
                    label="성인"
                    description="만 13세 이상"
                    minValue={1}
                    value={adultCount}
                    onChange={count => setAdultCount(count)}
                  />
                </div>
                <div className="mb-24">
                  <Counter
                    label="어린이"
                    description="2~12"
                    value={childrenCount}
                    onChange={count => setChildrenCount(count)}
                  />
                </div>
                <div className="mb-24">
                  <Counter
                    label="유아"
                    description="2세 미만"
                    value={infantsCount}
                    onChange={count => setInfantsCount(count)}
                  />
                  <p className="room-detail-reservation-guests-info">
                    최대{room.maximumGuestCount}명. 유아는 숙박 인원에 포함되지
                    않습니다.
                  </p>
                </div>
              </div>
            )}
          </OutsideClickHandler>
        </div>
      </div>
      <Button
        color={'amaranth'}
        width="100%"
        onClick={onClickReservationButton}
      >
        {startDate && endDate ? '예약하기' : '날짜 선택하기'}
      </Button>

      {startDate && endDate && (
        <>
          <p className="room-detail-reservation-price-date">
            {room.price} X {endDate.getDay() - startDate.getDay()}박
            <span>
              {Number(room.price) * (endDate.getDay() - startDate.getDay())}
            </span>
          </p>
          <p className="room-detail-reservation-total-price">
            총 합계
            <span>
              {Number(room.price) * (endDate.getDay() - startDate.getDay())}
            </span>
          </p>
        </>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default RoomDetailReservation;
