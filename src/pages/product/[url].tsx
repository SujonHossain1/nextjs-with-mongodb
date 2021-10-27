import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { IProduct } from 'types';

const Product: NextPage<IProduct> = ({
    title,
    shortDescription,
    price,
    image1,
}: IProduct) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div> {title} </div>
            <div> {price} </div>
            <div> {shortDescription} </div>
            <div> {image1} </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths<{ url: string }> = async () => {
    const res = await fetch(
        'https://dynobd-ecommerce.herokuapp.com/api/products'
    );
    const data: IProduct[] = await res.json();

    const paths = data?.map((item) => {
        return { params: { url: item.url } };
    });

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<IProduct> = async (ctx) => {
    const url = ctx.params?.url as string;

    const res = await fetch(
        `https://dynobd-ecommerce.herokuapp.com/api/products/${url}`
    );
    const product: IProduct = await res.json();
    return {
        props: product,
    };
};

export default Product;
