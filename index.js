"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
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
function getAllGrades() {
    return gradesCache.grades;
}
;
function getGrades(year) {
    if (year === undefined || year === null) {
        return getAllGrades();
    }
    else {
        return getAllGrades().filter(grd => { grd.grade === year; });
    }
}
app.get('/api/grades', (req, res) => {
    console.log("Get All Grades");
    res.send(getAllGrades());
});
app.delete('/api/grade/:id', (req, res) => {
    const id = req.params.id;
    const grds = gradesCache.grades.filter(grd => grd.id.toString() !== id);
    gradesCache.grades = grds;
    console.log("Delete", id);
    console.log(gradesCache.grades);
    res.send("Deleted");
});
app.post('/api/grade/create', body_parser_1.default.json(), (req, res) => {
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
    const host = process.env.HOST || "localhost";
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://${host}:${port}`);
    });
}
else {
    module.exports.handler = (0, serverless_http_1.default)(app);
}
console.log("the end");
