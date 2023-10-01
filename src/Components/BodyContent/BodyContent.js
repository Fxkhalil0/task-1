import React, { useState } from 'react';
import style from './BodyContent.module.css'
import DropzoneAreaBase from "./DropzoneAreaBase";
import PersonalInfoForm from "./PersonalInfoForm";
import ProfileForm from "./ProfileForm";
import AdditionailQuestion from "./AdditionalQuestion";



function BodyContent() {
    const [activeIndex, setActiveIndex] = useState(1);
    const progressItems = ["Program Details", "Application Details", "Workflow", "Preview"];

    return (
        <div className={style["mainbody__div"]}>
            <div className={style["progress__menu"]}>
                <div className={style["progress__item"]}>
                    {progressItems.map((item, index) => (
                        <p
                            key={index}
                            className={index === activeIndex ? style["active"] : ''}
                            onClick={() => setActiveIndex(index)}
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </div>
            <DropzoneAreaBase />
            <PersonalInfoForm />
            <ProfileForm />
            <AdditionailQuestion />
        </div>
    );
}

export default BodyContent;