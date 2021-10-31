import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import { myGet } from 'server/myGet';

const People: NextPage<any> = ({ people }: any) => {
    return (
        <div>
            <Link href="/products">
                <a>Products</a>
            </Link>
            {JSON.stringify(people)}
        </div>
    );
};

People.getInitialProps = async (ctx: NextPageContext) => {
    const json = await myGet('http://localhost:3000/api/person', ctx);
    return {
        people: json,
    };
};

export default People;
