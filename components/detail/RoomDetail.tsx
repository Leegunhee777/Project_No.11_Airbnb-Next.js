import React from 'react';
import styled from 'styled-components';
import { useSelector } from '../../store';
import palette from '../../styles/palette';
import RoomDetailPhotos from './RoomDetailPhotos';

const Container = styled.div`
  width: 1120px;
  margin: auto;
  padding-top: 26px;
  padding-bottom: 100px;
  .room-detail-title {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 15px;
  }
  .room-detail-location {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    color: ${palette.gray_71};
    margin-bottom: 24px;
  }
`;

const RoomDetail: React.FC = () => {
  const room = useSelector(state => state.room.detail);
  if (!room) {
    return null;
  }

  return (
    <Container>
      <h1 className="room-detail-title">{room.title}</h1>
      <p className="room-detail-location">
        {room.district}, {room.city}, {room.country}
      </p>
      <RoomDetailPhotos />
    </Container>
  );
};

export default RoomDetail;
