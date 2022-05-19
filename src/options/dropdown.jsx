import { useState, useEffect, useRef } from "react";
import "../Style/dropdown.css";
export function DropDown({
  option,
  selected,
  setSelected,
  className,
  classNameItems,
  id,
}) {
  const [isActive, setIsActive] = useState(false);
  let drop = useRef();
  function handleClick(e) {
    setIsActive(!isActive);
  }

  const close = () => setIsActive(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!drop.current.contains(e.target)) close();
    });
    window.removeEventListener("click", close);
  });
  // const [searchWords, setSearchWords] = useState();

  return (
    <div ref={drop} id={id}>
      <div onClick={handleClick} className={className}>
        <p>{selected}</p>
      </div>

      <div className={classNameItems}>
        {isActive && (
          <ul>
            {option.map((opt) => (
              <li onClick={() => setSelected(opt)}>{opt}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
