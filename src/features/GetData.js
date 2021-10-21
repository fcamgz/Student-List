import { useEffect, useState } from "react";

const GetData = () => {
    const[loading, setLoading] = useState(true);
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        fetch('https://api.hatchways.io/assessment/students')
        .then((response) => response.json())
        .then((studentData) => {
            for(let i = 0; i < studentData.students.length; i++){
                studentData.students[i].tags = [];
            }
            setStudentList(studentData.students);
        })
        setLoading(false);
    }, []);
    return {studentList, loading};
}

export default GetData;