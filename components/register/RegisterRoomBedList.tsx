import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import { BedType } from '../../types/room';
import RegisterRoomPublicBedTypes from './RegisterRoomPublicBedTypes';

interface IProps {
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
}

const RegisterRoomBedList: React.FC<IProps> = ({ bedList }) => {
  return (
    <ul className="register-room-bed-type-list-wrapper">
      {bedList.map(bedroom => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </ul>
  );
};

export default RegisterRoomBedList;
