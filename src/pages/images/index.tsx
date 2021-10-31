import { NextPage } from 'next';

interface Props {
    images: [
        {
            id: number;
            image: string;
        }
    ];
}
const images = [
    {
        id: 1,
        image: 'https://i.postimg.cc/C5bTpYBp/image1.png',
    },
    {
        id: 2,
        image: 'https://i.postimg.cc/CK6VjcTX/image2.png',
    },
    {
        id: 3,
        image: 'https://i.postimg.cc/vB93vX5C/image3.png',
    },
    {
        id: 4,
        image: 'https://i.postimg.cc/PJDhfY7c/image4.png',
    },
    {
        id: 5,
        image: 'https://i.postimg.cc/k5j7Tn8j/image5.png',
    },
    {
        id: 6,
        image: 'https://i.postimg.cc/zBV8M9Fq/image6.png',
    },
    {
        id: 7,
        image: 'https://i.postimg.cc/0QFPqcVD/image7.png',
    },
];

const index: NextPage<Props> = () => {
    return (
        <div style={{ margin: '50px', background: 'lightblue' }}>
            {images.map((image) => (
                <img src={image.image} key={image.id} alt="" />
            ))}
        </div>
    );
};

export default index;
