import React, { useMemo } from "react";

function list(files) {
  const label = (file) => {
    console.log(file);
    return `'${file.name}' of size '${file.size}'`;
    
  };

  return files.map((file) => <li key={file.name}>{label(file)}</li>);
}

export const FileList = ({ files }) => {
  const fileList = useMemo(() => {
    if (files.length === 0) {
      return <div>Nothing to display</div>;
    }
    return <ul>{list(files)}</ul>;
  }, [files]);

  return <div>{fileList}</div>;
};
