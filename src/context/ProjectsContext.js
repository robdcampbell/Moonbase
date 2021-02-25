import React, { useContext, useState, useEffect } from "react";

const ProjectsContext = React.createContext();

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const useActiveProject = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  value = {};

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
