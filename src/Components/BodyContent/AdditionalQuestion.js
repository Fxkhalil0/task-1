import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import style from './BodyContent.module.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';




function AdditionailQuestion() {
    const [formId] = useState(uuidv4());
    const [type, setType] = useState('');
    const [time, setTime] = useState('');
    const [add, setAdd] = useState(false)
    const [inputNumber, setInputNumber] = useState(1)
    const [questionInput, setQuestionInput] = useState("")
    const [choicesInput, setChoicesInput] = useState([])
    const [videoInput, setVideoInput] = useState("")
    const [videoDesc, setVideoDesc] = useState("")
    const [maxDuration, setMaxDuration] = useState("")
    const [formData, setFormData] = useState()
    const [question, setQuestion] = useState([{
        type: "paragraph",
        content: "kldslkjfd lkfl;s;l;zk;l dz.cxdsj lkfds lkwj lkewjl weoj o;lwe llj qlwl "
    },
    {
        type: "dropDown",
        content: "kldlkjlsdjlasslkjfdlkfdsjlkfds"
    }])

    useEffect(() => {
        axios.get("http://127.0.0.1:4010/api/205.9881726678027/programs/repellat/application-form").then((res) => {
            console.log(res.data.data.attributes.personalInformation)
            setFormData(res.data.data.attributes.personalInformation)
            // setQuestion(res.data.data.attributes.customisedQuestions)
            // console.log(res.data)
        })

    }, [])


    const handleChange = (event) => {
        setType(event.target.value);
    };
    const handleSaveQuestion = async () => {
        console.log(questionInput)
        if (type === 'Paragraph' || type === 'MultipleChoice' || type === 'Dropdown' || type === 'Yes/No' || type === 'Video') {
            if (!questionInput) {
                console.error('Question cannot be empty.');
                return;
            }

            let payload = {
                data: {
                    id: formId,
                    attributes: {
                        type: type,
                        question: questionInput,
                        personalInformation: formData,
                    },
                    type: 'applicationForm',
                },
            };

            if (type === 'MultipleChoice') {
                if (!choicesInput || choicesInput.length === 0) {
                    console.error('MultipleChoice question must have choices.');
                    return;
                }
                payload.data.attributes.choices = choicesInput;
            }

            try {
                const response = await axios.put(
                    'http://127.0.0.1:4010/api/803.595558086166/programs/dicta/application-form',
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 204) {
                    console.log('Question saved successfully.');
                }
            } catch (error) {
                console.error('Error saving question:', error);
            }
        }
    };

    return (
        <>
            <div className={style["personal__form__section"]}>
                <div className={style["box__header"]}>
                    <p>Additional Question</p>
                </div>
                <div className={style["questions"]}>
                    {
                        question.map((question) => (
                            <div className={style["question"]} key={question.id}>
                                <span>{question.type}</span>
                                <div className={style["content"]}>
                                    <p>
                                        {question.content}
                                    </p>
                                    <i className="fa-solid fa-pencil"></i>
                                </div>
                            </div>
                        ))
                    }
                    {/* <div className={style["question"]}>
                        <span>paragraph</span>
                        <div className={style["content"]}>
                            <p>lkjdsllkc jzxlkjclkxz ;osfl kdsnf,j  lsdflk ;lsdlf ;lsjfdlk ;lsfzlmz lkwldsa ;lsakd;lsak sa;ldk;lsa</p>
                            <i class="fa-solid fa-pencil"></i>
                        </div>
                    </div> */}
                    {/* <div className={style["question"]}>
                        <span>paragraph</span>
                        <div className={style["content"]}>
                            <p>lkjdsllkc jzxlkjclkxz ;osfl kdsnf,j  lsdflk ;lsdlf ;lsjfdlk ;lsfzlmz lkwldsa ;lsakd;lsak sa;ldk;lsa</p>
                            <i class="fa-solid fa-pencil"></i>
                        </div>
                    </div> */}
                </div>
                {
                    add &&
                    <Box sx={{ minWidth: 120, paddingX: "20px", marginBottom: "35px" }}>
                        <label className={style["label"]}>Type</label>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Paragraph"}>Paragraph</MenuItem>

                                <MenuItem value={"ShortAnswer"}>Short answer</MenuItem>
                                <MenuItem value={"Yes/No"}>Yes/No</MenuItem>
                                <MenuItem value={"Dropdown"}>Dropdown</MenuItem>
                                <MenuItem value={"MultipleChoice"}>Multiple choice</MenuItem>
                                <MenuItem value={"Date"}>Date</MenuItem>
                                <MenuItem value={"Number"}>Number</MenuItem>
                                <MenuItem value={"FileUpload"}>File upload</MenuItem>
                                <MenuItem value={"Video"}>Video question</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                }
                {
                    type == "Paragraph" &&
                    <div className={style["paragraph"]}>
                        <label className={style["label"]}>Question</label>
                        <input className={style["input"]}
                            type='text'
                            placeholder='Type here'
                            value={questionInput}
                            onChange={(e) => setQuestionInput(e.target.value)}
                        />
                        <div className={style["delete__save"]}>
                            <div className={style["delete"]} onClick={() => {
                                setType("")
                            }}>
                                <i class="fa-solid fa-xmark"></i>
                                <h4>Delete question</h4>
                            </div>
                            <button onClick={() => {
                                setType("")
                                handleSaveQuestion()
                            }}>save</button>
                        </div>
                    </div>
                }
                {
                    type == "MultipleChoice" &&
                    <div className={style["paragraph"]}>
                        <label className={style["label"]}>Question</label>
                        <input className={style["input"]}
                            type='text'
                            placeholder='Type here'
                            value={questionInput}
                            onChange={(e) => setQuestionInput(e.target.value)}
                        />
                        <label className={style["label"]} style={{ marginTop: "20px", marginLeft: "40px" }}>Choice</label>
                        {
                            Array.from({ length: inputNumber }).map((input, index) => (
                                <div key={index} className={style["multi"]}>
                                    <i class="fa-solid fa-align-center"></i>
                                    <input className={style["choice__input"]}
                                        type='text'
                                        placeholder='Type here'
                                        value={choicesInput[index] || ""}
                                        onChange={(e) => {
                                            const updatedChoices = [...choicesInput];
                                            updatedChoices[index] = e.target.value;
                                            setChoicesInput(updatedChoices);
                                        }}
                                    />
                                    <i onClick={() => {
                                        setInputNumber(inputNumber + 1)
                                    }} class="fa-solid fa-plus"></i>
                                </div>
                            ))
                        }
                        <div className={style["check"]}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Enable “Other” option" />
                            {/* <label>Enable “Other” option </label> */}
                        </div>
                        <label className={style["label"]} style={{ marginTop: "15px" }}>Max choice allowed</label>
                        <input className={style["input"]} type='text' placeholder='Enter number of choice allowed here' />
                        <div className={style["delete__save"]} style={{ marginTop: "10px" }}>
                            <div className={style["delete"]} onClick={() => {
                                setType("")
                            }}>
                                <i class="fa-solid fa-xmark"></i>
                                <h4>Delete question</h4>
                            </div>
                            <button onClick={() => {
                                setType("")
                                handleSaveQuestion()
                            }}>save</button>
                        </div>
                    </div>
                }
                {
                    type == "Dropdown" &&
                    <div className={style["paragraph"]}>
                        <label className={style["label"]}>Question</label>
                        <input className={style["input"]}
                            type='text'
                            placeholder='Type here'
                            value={questionInput}
                            onChange={(e) => setQuestionInput(e.target.value)}
                        />
                        <label className={style["label"]} style={{ marginTop: "20px", marginLeft: "40px" }}>Choice</label>
                        {
                            Array.from({ length: inputNumber }).map((input, index) => (
                                <div key={index} className={style["multi"]}>
                                    <i class="fa-solid fa-align-center"></i>
                                    <input className={style["input"]}
                                        type='text'
                                        placeholder='Type here'
                                        value={choicesInput[index] || ""}
                                        onChange={(e) => {
                                            const updatedChoices = [...choicesInput];
                                            updatedChoices[index] = e.target.value;
                                            setChoicesInput(updatedChoices);
                                        }}
                                    />
                                    <i onClick={() => {
                                        setInputNumber(inputNumber + 1)
                                    }} class="fa-solid fa-plus"></i>
                                </div>
                            ))
                        }
                        <div className={style["check"]}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Enable “Other” option" />
                            {/* <label>Enable “Other” option </label> */}
                        </div>
                        <div className={style["delete__save"]} style={{ marginTop: "10px" }}>
                            <div className={style["delete"]} onClick={() => {
                                setType("")
                            }}>
                                <i class="fa-solid fa-xmark"></i>
                                <h4>Delete question</h4>
                            </div>
                            <button onClick={() => {
                                setType("")
                                handleSaveQuestion()
                            }}>save</button>
                        </div>
                    </div>
                }
                {
                    type == "Yes/No" &&
                    <div className={style["paragraph"]}>
                        <label className={style["label"]}>Question</label>
                        <input className={style["input"]}
                            type='text'
                            placeholder='Type here'
                            value={questionInput}
                            onChange={(e) => setQuestionInput(e.target.value)}
                        />
                        <div className={style["check"]}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Disqualify candidate if the answer is no" />
                            {/* <label>Disqualify candidate if the answer is no </label> */}
                        </div>
                        <div className={style["delete__save"]}>
                            <div className={style["delete"]} onClick={() => {
                                setType("")
                            }}>
                                <i class="fa-solid fa-xmark"></i>
                                <h4>Delete question</h4>
                            </div>
                            <button onClick={() => {
                                setType("")
                                handleSaveQuestion()
                            }}>save</button>
                        </div>
                    </div>

                }
                {
                    type === "Video" && (
                        <div className={style["paragraph"]}>
                            <label className={style["label"]}>Question</label>
                            <input
                                className={style["input"]}
                                type="text"
                                placeholder="Type here"
                                value={questionInput}
                                onChange={(e) => setQuestionInput(e.target.value)} // Update questionInput state
                            />
                            <input
                                className={style["input"]}
                                style={{ height: "70px", marginTop: "15px" }}
                                type="text"
                                placeholder="Type here"
                                value={videoDesc}
                                onChange={(e) => setVideoDesc(e.target.value)} // Update videoDesc state
                            />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                                <input
                                    className={style["input"]}
                                    style={{ width: "55%" }}
                                    type="text"
                                    placeholder="Max duration of video"
                                    value={maxDuration}
                                    onChange={(e) => setMaxDuration(e.target.value)} // Update maxDuration state
                                />
                                <FormControl sx={{ width: "38%" }}>
                                    <InputLabel id="demo-simple-select-label">in (sec/min)</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={time}
                                        label="in (sec/min)"
                                        onChange={(e) => {
                                            setTime(e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"Paragraph"}>minutes</MenuItem>
                                        <MenuItem value={"ShortAnswer"}>seconds</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={style["delete__save"]}>
                                <div className={style["delete"]} onClick={() => setType("")}>
                                    <i className="fa-solid fa-xmark"></i>
                                    <h4>Delete question</h4>
                                </div>
                                <button onClick={() => {
                                    setType("")
                                    handleSaveQuestion()
                                }}>save</button>
                            </div>
                        </div>
                    )
                }

                {
                    type == "" &&
                    <div className={style["add__question"]} onClick={() => {
                        setAdd(true)
                    }}>
                        <i class="fa-solid fa-plus"></i>
                        <h4>Add a question</h4>
                    </div>
                }
            </div>
        </>
    );
}

export default AdditionailQuestion;