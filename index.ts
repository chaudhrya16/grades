import express, { Express, Request, Response } from "express";
import serverless from "serverless-http";
import bodyParser from 'body-parser';
const app: Express = express();
//npx tsc -> to solve the tsc issues


type Term = "Fall" | "Spring" | "Summer";
type LetterGrade = 'A' | 'B' | 'C' | 'D' | 'F';
type HighSchoolYear = "9" | "10" | "11" | "12";
type CourseType = 'H' | 'AP' | 'Regular';//

const gradesCache = {
    grades: [
      {
        id: 1,
        course: "AP Computer Science A",
        grade: "9",
        term: "Fall",
        type: "AP",
        letterGrade: "A",
      },
      {
        id: 2,
        course: "AP Computer Science A",
        grade: "9",
        term: "Spring",
        type: "AP",
        letterGrade: "B",
      },
      {
        id: 3,
        course: "Literature",
        grade: "9",
        term: "Fall",
        type: "Regular",
        letterGrade: "A",
      },
      {
        id: 4,
        course: "Literature",
        grade: "9",
        term: "Spring",
        type: "Regular",
        letterGrade: "C",
      },
      {
        id: 5,
        course: "Physics",
        grade: "10",
        term: "Fall",
        type: "H",
        letterGrade: "A",
      },
      {
        id: 6,
        course: "Physics",
        grade: "11",
        term: "Spring",
        type: "H",
        letterGrade: "C",
      },
      {
        id: 7,
        course: "AP Chem",
        grade: "12",
        term: "Fall",
        type: "AP",
        letterGrade: "C",
      },
      {
        id: 8,
        course: "AP Chem",
        grade: "12",
        term: "Spring",
        type: "AP",
        letterGrade: "A",
      },
    ],
  };
function getAllGrades () : {
    id: number,
    course: string,
    grade: string,
    term: string,
    type: string,
    letterGrade: string,
  }[] {
   
    return  gradesCache.grades;
        
};

 function getGrades (year?: string) :  {
    id: number,
    course: string,
    grade: string,
    term: string,
    type: string,
    letterGrade: string,
  }[]  {
   
    if (year === undefined || year === null) {
       return getAllGrades();
    } 
    else {
        return getAllGrades().filter(grd => {grd.grade === year});
    }

} 


app.get('/api/grades', (req: Request, res: Response) => {
        console.log("Get All Grades");
        res.send(getAllGrades());
    });

app.delete('/api/grade/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const grds = gradesCache.grades.filter(grd =>  grd.id.toString() !== id);  
  gradesCache.grades = grds; 
  console.log("Delete", id);
  console.log(gradesCache.grades);
  res.send("Deleted");
});


app.post('/api/grade/create',  bodyParser.json(), (req: Request, res: Response) => {
  const grds = gradesCache.grades.filter(grd => grd.id === req.body.id);
  if (grds.length === 0) {
   const newGrade = {
    id: req.body.id,
    course: req.body.course,
    grade: req.body.grade,
    term: req.body.term,
    type: req.body.type,
    letterGrade: req.body.letterGrade,
  };
  gradesCache.grades.push(newGrade);
  console.log("Created", newGrade.id);
  console.log(gradesCache.grades);
  res.send("Created");
}
else {
  console.log("Already exists", req.body.id);
  console.log(gradesCache.grades);
  res.send("Already exists");
}
});
    
if (process.env.PORT) {
    const port = process.env.PORT || 3002;
    const host= process.env.HOST || "localhost";
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://${host}:${port}`);
    }); 
} 
else {
    module.exports.handler = serverless(app);
}
console.log("the end");

