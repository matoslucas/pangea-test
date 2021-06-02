import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { uuid } from "uuidv4";
import { Tag } from "antd";
import TagForm from "../com/TagForm";

type hashType = {
  list: string[];
};

const TagList = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, setList] = useState<hashType>({ list: [] });

  const isColor = (strColor: string) => {
    var s = new Option().style;
    s.color = strColor;
    return s.color === strColor;
  };

  const captureHashTags = () => {
    if (location && location.hash) {
      const parsedHash = queryString.parse(location.hash);

      const tags = String(parsedHash["tags"]).split(",");

      if (parsedHash["tags"] && tags.length) {
        setList({ list: tags });
      } else {
        setList({ list: [] });
      }
    }
  };

  const onCloseHandler = (value: string) => {
    const { list } = state;
    const updated = list.filter((item) => item !== value);
    history.push(`/#tags=${updated.join(",")}`);
  };

  const renderList = () => {
    return state.list.map((item: string) => {
      if (isColor(item)) {
        return (
          <li key={uuid()} className={"item"}>
            <Tag closable color={item} onClose={() => onCloseHandler(item)}>
              {item}
            </Tag>
          </li>
        );
      } else {
        return (
          <li key={uuid()} className={"item"}>
            <Tag closable onClose={() => onCloseHandler(item)}>
              {item}
            </Tag>
          </li>
        );
      }
    });
  };

  const onSubmitHandler = (value: string) => {
    let { list } = state;
    list.push(value);
    history.push(`/#tags=${list.join(",")}`);
  };

  useEffect(() => {
    captureHashTags();
  }, [location]);

  return (
    <div className={"tags-container"}>
      <h2>Tags</h2>
      <ul className={"list-container"}>{renderList()}</ul>
      <TagForm onSubmit={onSubmitHandler} list={state.list} />
    </div>
  );
};
export default TagList;
