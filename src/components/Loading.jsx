import React from 'react';
import { css } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  padding-top:100px;
`;

const Loading = () => {
    return (
        <div className="loading" >
            <PacmanLoader color="#36D7B7" css={override} size={25} />
            <p>Loading...</p>
        </div>
    );
};

export default Loading;
