import React from "react";
import ClassCard from "./classCard";
export default function ClassGrid (){
    return (
        <div className="grid grid-cols-3 gap-4">
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
        </div>
    );
}