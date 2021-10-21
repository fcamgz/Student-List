import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import GetData from "../features/GetData";
import { useState } from "react";

const UserCards = () => {
    const {studentList, loading} = GetData();
    const [tagNumber, setTagNumber] = useState(0);
    const [tag, setTag] = useState('');
    const [expand, setExpand] = useState(0);
    const [isExpand, setIsExpand] = useState(false);
    const [searchNameValue, setSearchNameValue] = useState('');
    const [searchTagValue, setSearchTagValue] = useState('');

    const getAverage = (total, grades) => {
        return (total + Math.round(grades) / 8);
    }
    const upperCaseIt = (word) => {
        return word.toUpperCase();
    }

    const handleExpandClick = (student) => {
        setExpand(student);
        setIsExpand(!isExpand);
    }

    const handleInputClick = (inputNum) => {
        setTagNumber(inputNum);
    }

    const searchStudent = (searchName, searchTags) => {
        if(!searchName && !searchTags)
            return studentList;

        else if(!searchName && searchTags){
            return studentList.filter((student) => {
                const studentTags = JSON.stringify(student.tags).toLowerCase();
                return studentTags.includes(searchTags.toLowerCase());
            });
        }
        else if(searchName && !searchTags){
            return studentList.filter((student) => {
                const fullName = student.firstName + " " + student.lastName;
                const studentName = fullName.toLowerCase();
                return studentName.includes(searchName.toLowerCase());
            });
        }
        else{
            return studentList.filter((student) => {
                const fullName = student.firstName + " " + student.lastName;
                const studentName = fullName.toLowerCase();
                const studentTags = JSON.stringify(student.tags).toLowerCase();
                return studentName.includes(searchName.toLowerCase()) && studentTags.includes(searchTags.toLowerCase());
            });
        }
    }
    const students = searchStudent(searchNameValue, searchTagValue);

    const handleSubmit = (event) => {
        event.preventDefault();
        studentList[tagNumber].tags.push(tag);
        setTag('');
    }

    const useStyles = makeStyles({
        circularPicture: {
            borderRadius: '50%', 
            width: '120px', 
            height: '120px', 
            overflow: 'hidden',
            float: 'left',
            marginLeft: '125px',
            marginTop: '20px',
            display: 'inline-block',
            verticalAlign: 'middle',
            border: '1px solid black'
        },
        list: {
            listStyle: "none",
            '&::-webkit-scrollbar': {
              width: '0.6em',
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                borderRadius: '15%'
            }
        }
    })

    const classes = useStyles();
    return(
        <Box sx={{backgroundColor: '#E8E8E8'}}>
        <Box sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box className={classes.list} sx={{width: '55vw',height:'80%', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: 'white', borderRadius: '1%', paddingLeft:'10px', paddingRight: '10px'}}>
                <TextField
                    label='Search by name'
                    fullWidth
                    margin='normal'
                    value={searchNameValue}
                    onChange={(e) => setSearchNameValue(e.target.value)}
                />
                <TextField
                    label='Search by tag'
                    fullWidth
                    margin='normal'
                    value={searchTagValue}
                    onChange={(e) => setSearchTagValue(e.target.value)}
                />
                {loading ? <Typography variant='h5'>Loading...</Typography>
                : (
                    students.map((student, index) => 
                        <Box key={student.id} className='row' sx={{ width: '55vw', heigth: '70vh'}}>
                            <Box mt={2} className='col-4'>
                                <img className={classes.circularPicture} width='15%' src={student.pic} alt={student.firstName}/>
                            </Box>
                            <Box mt={2} mb={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} className='col-8'>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                    <Typography variant='h3'>{upperCaseIt(student.firstName)} {upperCaseIt(student.lastName)}</Typography>
                                    <Button value={expand} onClick={() => handleExpandClick(index)} variant='contained'>{ isExpand ? '-' : '+'}</Button>
                                </Box>
                                <Box mt={1} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '30px'}}>
                                    <Typography>Email: {student.email}</Typography>
                                    <Typography>Company: {student.company}</Typography>
                                    <Typography>Skill: {student.skill}</Typography>
                                    <Typography>Average: {student.grades.reduce(getAverage, 0)}%</Typography>
                                    <br/>
                                    {expand === index && isExpand ? student.grades.map((grade, index) => (
                                        <Box mb={2}>
                                            <Typography>Test {index+=1}: {grade}%</Typography>
                                        </Box>
                                    ))
                                    : ('')
                                    }
                                    Tags: 
                                    {
                                        student.tags.map((tag) =>
                                        <Box sx={{border: '1px solid #E8E8E8', padding: '10px', backgroundColor: '#E8E8E8', borderRadius: '10%'}} mt={1} mb={1}>
                                            <Typography>{tag}</Typography>
                                        </Box> 
                                        )
                                    }
                                    <form onSubmit={handleSubmit}>
                                            <TextField
                                            type='text'
                                            label='Add a tag'
                                            name={index}
                                            onChange={(e) => setTag(e.target.value)}
                                            />
                                        <Button ml={2} onClick={() => handleInputClick(index)} type='submit' variant='contained'>Add tag</Button>
                                    </form>
                                </Box>
                            </Box>
                            <hr/>
                        </Box>
                    ))}    
                </Box>
            </Box>
        </Box>
    );
}

export default UserCards;