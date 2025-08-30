import { useState, useMemo, useEffect } from 'react'
import './attpage.css'
import axios from 'axios';
function Attendancepage() {
    const [studentInfo, setstudentInfo] = useState([]);
    const [isDisplay, setisDispaly] = useState(false);
    const [newStudent, setnewStudent] = useState('');

    const Addstudent = () => {
        const student = newStudent;
        setnewStudent('');
        axios.post('/addstu', {
            name: student
        }).then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:5001/attendance', {
            headers: {
                token: localStorage.getItem("token-AttTracker")
            }
        }).then(res => {
            const updated = res.data.map(student => ({
                ...student,
                present: false
            }));
            setstudentInfo(updated);
        }).catch(err => console.log(err.message));
    }, []);

    const handleClick = (e) => {
        const id = Number(e.target.id); // ensure number
        const updated = studentInfo.map(student =>
            student.stu_id === id
                ? { ...student, present: !student.present }
                : student
        );
        setstudentInfo(updated);
    };

    const resetAll = () => {
        const reset = studentInfo.map(student => ({
            ...student,
            present: false
        }));
        setstudentInfo(reset);
    };

    return (
        <>
            <h1 className='header'>Student Attendance</h1>
            <div className='container'>
                <div className='student-container'>
                    {
                        studentInfo.length > 0 ? (
                            studentInfo.map(item => (
                                <div key={item.stu_id} className="Studentinfo">
                                    <p>{item.student_name}</p>
                                    <input type='checkbox' id={item.stu_id} checked={item.present} onChange={(e) => handleClick(e)}></input>
                                </div>
                            ))
                        ) : (
                            <p>Please Take the Attendance</p>
                        )
                    }
                    <div className='btns'>
                        <button onClick={() => setisDispaly(!isDisplay)} className='submitbtn'>
                            Submit
                        </button>

                        <button onClick={() => resetAll()} className='resetbtn'>Reset</button>
                    </div>
                    <div className='Addstudent'>
                        <input value={newStudent} placeholder='Add Student' onChange={(e) => setnewStudent(e.target.value)}></input>
                        <button onClick={Addstudent} className='addbtn'>Add Student</button>
                    </div>
                </div>

                {/* {
                    isDisplay ? (
                        <div className='ListofStudents'>
                            <div className='present'>
                                {<p >Present:</p>}
                                {Object.entries(Students).filter(([_, value]) => (value === true)).map(([key, value]) => (
                                    <p>{key}</p>
                                ))}
                            </div>

                            <div className='Absentees'>
                                {<p >Absent:</p>}
                                {Object.entries(Students).filter(([_, value]) => (value === false)).map(([key, value]) => (
                                    <p>{key}</p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className='error'></p>
                    )
                } */}
            </div>

        </>
    )

}

export default Attendancepage;
