import React, { useState } from "react";

export default function AddStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <li className={isOpen ? "m-menu -active" : "m-menu "}>
      <div>
        <button className="btn-blue"  onClick={toggle}>+ Add Student</button>
      </div>
      <ul className="m-menu__list">
        <li className="m-menu__item">
          <div className="m-menu__link">Log Out</div>
        </li>
      </ul>
    </li>
  );
}
