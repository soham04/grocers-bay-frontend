import React, { useState } from 'react';
import './DescriptionBox.scss'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const DescriptionBox = ({ short_description, long_description }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="description-box">
            <div className="description-content" onClick={toggleExpanded}>
                <div className="description-text">Description</div>
                <div className="expand-arrow" >
                    {expanded ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
                </div>
            </div>
            <p>{short_description}</p>

            {expanded && (
                <div className="mt-4" dangerouslySetInnerHTML={{ __html: long_description }}>
                    {/* <p>{long_description}</p> */}
                </div>
            )}
        </div>
    );
};

export default DescriptionBox;
