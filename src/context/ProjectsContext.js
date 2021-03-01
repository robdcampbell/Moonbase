import React, { useContext, useState, useEffect } from "react";

const ProjectsContext = React.createContext();

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const useActiveProject = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  // ALL USER PROJECTS *****************************
  const [userProjects, setUserProjects] = useState([]);
  const [activeProject, setActiveProject] = useState("");
  // ALL ACTIVE PROJECT *****************************
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  // ACTIVE POST STATE *****************************
  const [activeTitleUpdate, setActiveTitleUpdate] = useState("");
  const [activeDescriptionUpdate, setActiveDescriptionUpdate] = useState("");
  const [activeDeadlineUpdate, setActiveDeadlineUpdate] = useState("");
  const [activeStatusUpdate, setActiveStatusUpdate] = useState("");

  const value = {
    userProjects,
    setUserProjects,
    activeProject,
    setActiveProject,
    showProjectDetails,
    setShowProjectDetails,
    activeTitleUpdate,
    setActiveTitleUpdate,
    activeDescriptionUpdate,
    setActiveDescriptionUpdate,
    activeDeadlineUpdate,
    setActiveDeadlineUpdate,
    activeStatusUpdate,
    setActiveStatusUpdate,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
