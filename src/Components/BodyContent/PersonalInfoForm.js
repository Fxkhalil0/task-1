import React, { useState } from "react";
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

function PersonalInfoForm() {
    const [formId] = useState(uuidv4());
    const [switchState, setSwitchState] = useState([true, true, true, true, true]);

    const handleSwitchChange = (index) => {
        const newSwitchStates = [...switchState];
        newSwitchStates[index] = !newSwitchStates[index];
        setSwitchState(newSwitchStates);
    };
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        nationality: "",
        currentres: "",
        idnum: "",
        dateOfBirth: "",
        gender: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            data: {
                id: formId,
                type: "applicationForm",
                attributes: {
                    personalInformation: {
                        firstName: {
                            value: formData.fname,
                            internalUse: false,
                            show: true,
                        },
                        lastName: {
                            value: formData.lname,
                            internalUse: false,
                            show: true,
                        },
                        emailId: {
                            value: formData.email,
                            internalUse: false,
                            show: true,
                        },
                        phoneNumber: {
                            value: formData.phone,
                            internalUse: false,
                            show: true,
                        },
                        nationality: {
                            value: formData.nationality,
                            internalUse: false,
                            show: true,
                        },
                        currentResidence: {
                            value: formData.currentres,
                            internalUse: false,
                            show: true,
                        },
                        idNumber: {
                            value: formData.idnum,
                            internalUse: false,
                            show: true,
                        },
                        dateOfBirth: {
                            value: formData.dateOfBirth,
                            internalUse: false,
                            show: true,
                        },
                        gender: {
                            value: formData.gender,
                            internalUse: false,
                            show: true,
                        },
                    },
                },
            },
        };



        console.log(dataToSend)
        try {
            const response = await axios.put('http://127.0.0.1:4010/api/28.459138171084163/programs/pariatur/application-form', dataToSend);

            if (response.status === 204) {
                console.log("Form data updated successfully.");
            }
        } catch (error) {
            console.error("Error updating form data:", error);
        }
    };

    return (
        <div className={style["personal__form__section"]}>
            <div className={style["box__header"]}>
                <p>Personal Information</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    name="fname"
                    type='text'
                    value={formData.fname}
                    onChange={handleInputChange}
                />
                <label>Last Name</label>
                <input
                    name="lname"
                    type='text'
                    value={formData.lname}
                    onChange={handleInputChange}
                />
                <label>Email</label>
                <input
                    name="email"
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}

                />
                <div className={style["customize__input"]}>
                    <label>Phone <span className={style["dial__style"]}>(Without dial code)</span></label>
                    <div className={style["control__buttons"]}>
                        <FormControlLabel control={<Checkbox />} label="Internal" />
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch defaultChecked />}
                                checked={switchState[0]}
                                onChange={() => handleSwitchChange(0)}
                                label={switchState[0] ? "Hide" : "Show"}
                            />
                        </FormGroup>
                    </div>
                </div>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <div className={style["customize__input"]}>
                    <label>Nationality</label>
                    <div className={style["control__buttons"]}>
                        <FormControlLabel control={<Checkbox />} label="Internal" />
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch defaultChecked />}
                                checked={switchState[1]}
                                onChange={() => handleSwitchChange(1)}
                                label={switchState[1] ? "Hide" : "Show"}
                            />
                        </FormGroup>
                    </div>
                </div>
                <input
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                />
                <div className={style["customize__input"]}>
                    <label>Current Residence</label>
                    <div className={style["control__buttons"]}>
                        <FormControlLabel control={<Checkbox />} label="Internal" />
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch defaultChecked />}
                                checked={switchState[2]}
                                onChange={() => handleSwitchChange(2)}
                                label={switchState[2] ? "Hide" : "Show"}
                            />
                        </FormGroup>
                    </div>
                </div>
                <input
                    name="currentres"
                    value={formData.currentres}
                    onChange={handleInputChange}
                />
                <div className={style["customize__input"]}>
                    <label>ID Number</label>
                    <div className={style["control__buttons"]}>
                        <FormControlLabel control={<Checkbox />} label="Internal" />
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch defaultChecked />}
                                checked={switchState[3]}
                                onChange={() => handleSwitchChange(3)}
                                label={switchState[3] ? "Hide" : "Show"}
                            />
                        </FormGroup>
                    </div>
                </div>
                <input
                    name="idnum"
                    value={formData.idnum}
                    onChange={handleInputChange}
                />
                <div className={style["customize__input"]}>
                    <label>Date of Birth</label>
                    <div className={style["control__buttons"]}>
                        <FormControlLabel control={<Checkbox />} label="Internal" />
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch defaultChecked />}
                                checked={switchState[4]}
                                onChange={() => handleSwitchChange(4)}
                                label={switchState[4] ? "Hide" : "Show"}
                            />
                        </FormGroup>
                    </div>
                </div>
                <input
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                />
                <div className={style["customize__input"]}>
                    <label>Gender</label>
                    <div className={style["control__buttons"]}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

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

export default PersonalInfoForm;