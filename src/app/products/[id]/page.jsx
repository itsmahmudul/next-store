import React from 'react';

const page = ({ params }) => {

    const id = params.id;

    return (
        <div>
            <p>ID: {id}</p>
            <h1>
                Here Products details....
            </h1>
        </div>
    );
};

export default page;