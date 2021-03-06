import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import CardItem from 'src/components/Card';
import { IProduct } from 'types';

interface IProps {
    products: IProduct[];
}

const index: NextPage<IProps> = ({ products }: IProps) => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={4} key={product._id}>
                                <Link
                                    href="/product/[id]"
                                    as={`/product/${product.url}`}
                                >
                                    <a>
                                        <CardItem product={product} />
                                    </a>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const res = await fetch(
        'https://dynobd-ecommerce.herokuapp.com/api/products'
    );
    const data = await res.json();

    return {
        props: {
            products: data,
        },
    };
};

export default index;
