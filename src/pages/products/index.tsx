import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { IProduct } from 'types';

interface IProps {
    products: IProduct[];
}

const Products: NextPage<IProps> = ({ products }: IProps) => {
    return (
        <div>
            <Link href="/people">
                <a>People</a>
            </Link>
            <pre>{JSON.stringify(products, null, 4)}</pre>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
    context
) => {
    const res = await fetch(
        'https://dynobd-ecommerce.herokuapp.com/api/products'
    );
    const data = await res.json();

    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });

    return {
        props: {
            products: data,
        },
    };
};

export default Products;
