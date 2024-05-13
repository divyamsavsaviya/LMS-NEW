import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassDetails, getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { Paper, BottomNavigation, BottomNavigationAction, Container, Table, TableBody, Typography, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomBarChart from '../../components/CustomBarChart';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { Grid, Button } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }, [dispatch, currentUser._id, currentUser.sclassName._id]);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('details');

    useEffect(() => {
        if (userDetails && userDetails.examResult) {
            setSubjectMarks(userDetails.examResult);
        }
    }, [userDetails]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const quizzes = [
        { title: 'Quiz 1', totalGrade: 100, datePosted: '2022-01-01' },
        // More quizzes...
      ];

      const assignments = [
        { title: 'Assignment 1', totalGrade: 100, datePosted: '2022-01-01' },
    ];
    const [selectedSubject, setSelectedSubject] = useState('');
    const [totalGrade, setTotalGrade] = useState(0);

    // Function to calculate total grade
    const calculateTotalGrade = () => {
        const totalAssignmentsGrade = assignments
            .filter(assignment => assignment.subjectCode === selectedSubject)
            .reduce((total, assignment) => total + assignment.totalGrade, 0);
    
        const totalQuizzesGrade = quizzes
            .filter(quiz => quiz.subjectCode === selectedSubject)
            .reduce((total, quiz) => total + quiz.totalGrade, 0);
    
        setTotalGrade(totalAssignmentsGrade + totalQuizzesGrade);
    };

    /* const renderTableSection = () => (
        <Table>
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell>Subject</StyledTableCell>
                    <StyledTableCell>Marks</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {subjectMarks.map((result, index) => (
                    result.subName && result.marksObtained && (
                        <StyledTableRow key={index}>
                            <StyledTableCell>{result.subName.subName}</StyledTableCell>
                            <StyledTableCell>{result.marksObtained}</StyledTableCell>
                        </StyledTableRow>
                    )
                ))}
            </TableBody>
        </Table>
    ); */

    const renderChartSection = () => (
        <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
    );
/* Details Tab  */
const renderClassDetailsSection = () => (
    <Container>
        <Typography variant="h4" align="center">Class Details</Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="class details table">
                <TableHead>
                    <TableRow>
                        <TableCell>Semester Name</TableCell>
                        <TableCell>Subject Name</TableCell>
                        <TableCell>Subject Code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subjectsList.map((subject, index) => (
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            Fall 2024
                            </TableCell>
                            <TableCell>{subject.subName}</TableCell>
                            <TableCell>{subject.subCode}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
);

/* Assignments and Quizzes  */
const renderAssignmentsAndQuizzesSection = () => (
    <Container>
        <FormControl fullWidth style={{ margin: '20px 0' }}>
            <InputLabel id="select-subject-label">Choose Subject</InputLabel>
            <Select
                labelId="select-subject-label"
                id="select-subject"
                value={selectedSubject}
                label="Choose Subject"
                onChange={e => setSelectedSubject(e.target.value)}
            >
                {subjectsList.map((subject, index) => (
                    <MenuItem key={index} value={subject.subCode}>
                        {subject.subName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                {/* Assignments Table */}
            </Grid>
            <Grid item xs={6}>
                {/* Quizzes Table */}
            </Grid>
        </Grid>
        
        <Button variant="contained" color="primary" onClick={calculateTotalGrade}>
            View Grade
        </Button>
        <Typography variant="h6" component="h2">
            Total Grade: {totalGrade}
        </Typography>
        <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} md={6}>
                <Typography variant="h6" component="div">Quizzes</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="quizzes table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Quiz Title</TableCell>
                                <TableCell align="right">Total Grade</TableCell>
                                <TableCell align="right">Date Posted</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quizzes.filter(quiz => quiz.subjectCode === selectedSubject).map((quiz) => (
                                <TableRow key={quiz.title}>
                                    <TableCell component="th" scope="row">
                                        {quiz.title}
                                    </TableCell>
                                    <TableCell align="right">{quiz.totalGrade}</TableCell>
                                    <TableCell align="right">{quiz.datePosted}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="h6" component="div" style={{ marginTop: 0 }}>Assignments</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="assignments table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Assignment Title</TableCell>
                                <TableCell align="right">Total Grade</TableCell>
                                <TableCell align="right">Date Posted</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignments.filter(assignment => assignment.subjectCode === selectedSubject).map((assignment) => (
                                <TableRow key={assignment.title}>
                                    <TableCell component="th" scope="row">
                                        {assignment.title}
                                    </TableCell>
                                    <TableCell align="right">{assignment.totalGrade}</TableCell>
                                    <TableCell align="right">{assignment.datePosted}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Container>
);


/* Announcements */

    return (
        <div>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                    <Paper elevation={3}>
                        <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                        <BottomNavigationAction
                                label="Details"
                                value="details"
                                
                            />

                            <BottomNavigationAction
                                label="Quizzes&Assignments"
                                value="Quizzes/Assignments"
                                
                            />

                                <BottomNavigationAction
                                label="Announcements"
                                value="Announcements"
                                
                            />
                            
                        </BottomNavigation>
                    </Paper>
                    {/* {selectedSection === 'table' && renderTableSection()} */}
                    {selectedSection === 'Quizzes/Assignments' && renderAssignmentsAndQuizzesSection()}
                    {selectedSection === 'details' && renderClassDetailsSection()}
                </>
            )}
        </div>
    );
};

export default StudentSubjects;
