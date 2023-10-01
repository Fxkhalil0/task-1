import React, { useState, useEffect } from "react";
import style from './BodyContent.module.css'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 9,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        backgroundColor: '#1976d2',
        opacity: 1,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
        color: '#fff',
    },
}));

function ProfileForm() {
    const [formId] = useState(uuidv4());
    const [personalData, setPersonalData] = useState()

    useEffect(() => {
        axios.get("http://127.0.0.1:4010/api/205.9881726678027/programs/repellat/application-form").then((res) => {
            console.log(res.data.data.attributes.personalInformation)
            setPersonalData(res.data.data.attributes.personalInformation)
        })
    }, [])
    const [switchState, setSwitchState] = useState([true, true, true]);

    const handleSwitchChange = (index) => {
        const newSwitchStates = [...switchState];
        newSwitchStates[index] = !newSwitchStates[index];
        setSwitchState(newSwitchStates);
    };

    const [formData, setFormData] = useState({
        education: "",
        experience: "",
        resume: "",
    });


    const handleSubmit = async (event) => {
        event.preventDefault();


        const payload = {
            data: {
                id: formId,
                attributes: {
                    education: formData.education,
                    experience: formData.experience,
                    resume: formData.resume,
                    personalInformation: personalData,
                },
                type: "applicationForm",
            },
        };

        try {
            const response = await axios.put(
                'http://127.0.0.1:4010/api/28.459138171084163/programs/pariatur/application-form',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 204) {
                console.log("Form data updated successfully.");
            }
        } catch (error) {
            console.error("Error updating form data:", error);
        }
    }

    return (
        <div className={style["personal__form__section"]}>
            <div className={style["box__header"]}>
                <p>Profile</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={style["customize__input"]}>
                    <label>Education</label>
                    <div className={style["control__buttons"]}>
                        <FormControlLabel control={<Checkbox />} label="Mandatory" />
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch defaultChecked
                                    checked={switchState[0]}
                                    onChange={() => handleSwitchChange(0)}
                                    value={formData.education}

                                />
                                }

                                label={switchState[0] ? "Hide" : "Show"}
                            />
                        </FormGroup>
                    </div>
                </div>
                <input
                    name="education"
                />
                <div className={style["customize__input"]}>
                    <label>Experience</label>
                    <div className={style["control__buttons"]}>
                        <FormControlLabel control={<Checkbox />} label="Mandatory" />
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch defaultChecked
                                    checked={switchState[1]}
                                    onChange={() => handleSwitchChange(1)}
                                    value={formData.experience}

                                />
                                }
                                label={switchState[1] ? "Hide" : "Show"}

                            />
                        </FormGroup>
                    </div>
                </div>
                <input
                    name="experience"
                />
                <div className={style["customize__input"]}>
                    <label>Resume</label>
                    <div className={style["control__buttons"]}>
                        <FormControlLabel control={<Checkbox />} label="Mandatory" />
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch
                                    checked={switchState[2]}
                                    onChange={() => handleSwitchChange(2)}
                                    value={formData.resume}
                                />
                                }
                                label={switchState[2] ? "Hide" : "Show"}
                            />
                        </FormGroup>
                    </div>
                </div>
                <input
                    name="resume"
                />

                <div className={style["add__question__label"]}>
                    <i class="fa-solid fa-plus" style={{ fontSize: '25px' }}></i>
                    <p>Add a question</p>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button type='submit' className={style["submit__btn"]}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;