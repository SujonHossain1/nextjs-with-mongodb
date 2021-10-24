import { NextPage, NextPageContext } from 'next';
import { IVehicle } from 'types';

interface IProps {
    vehicles: IVehicle[] | undefined;
}

const Vehicle: NextPage<IProps> = (vehicles: IProps) => {
    return <div></div>;
};

Vehicle.getInitialProps = async (context: NextPageContext): Promise<IProps> => {
    const res = await fetch('http://localhost:3000/api/vehicle');
    const data: IVehicle[] | undefined = await res.json();
    return {
        vehicles: data,
    };
};

export default Vehicle;
