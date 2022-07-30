import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
import courses from "../course";

const Course = () => {
    
    return  <div> {
         courses.map (course => <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>)
    } </div>
}

export default Course;