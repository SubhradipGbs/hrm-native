import axios from "axios";

const api = axios.create({
  baseURL: "https://api.gbsit.co.in/api",
});

api.defaults.headers.common["Authorization"] = "";

const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login?envType=dev", {
      email: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserDetails = async (userId) => {
  try {
    const response = await api.post("/users/get-user-details", { id: userId });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSideMenu = async () => {
  try {
    const response = await api.get("/utils/get-sidemenu");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDashboardDetails = async () => {
  try {
    const response = await api.get("/dashboard/get-details", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getEmployeeDetails = async () => {
  try {
    const response = await api.get("/users/get-employess-all-details");
    return response.data;
    // setFilteredData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getAllEmployees = async () => {
  try {
    const response = await api.get("/users/get-all-employess");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

const getClients = async () => {
  try {
    const response = await api.get("/clients/get-clients-all", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const addClient = async (obj) => {
  try {
    const response = await api.post("/clients/create-new", obj);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getCompanyBranch = async () => {
  try {
    const response = await api.get("/branches/get-all", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const addCompanyBranch = async (obj) => {
  try {
    const response = await api.post("/branches/add-new", obj);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getcompanyData = async () => {
  try {
    const response = await api.get("/department/get-dpt", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const geteducationData = async () => {
  try {
    const response = await api.get("/users/educations/all", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getLanguageData = async () => {
  try {
    const response = await api.get("/users/language/get-all", {});
    setLanguage(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getLeaveData = async () => {
  try {
    var fiscalyear = "";
    var today = new Date();
    if (today.getMonth() + 1 <= 3) {
      fiscalyear = today.getFullYear() - 1 + "-" + today.getFullYear();
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1);
    }
    const userId = await AsyncStorage.getItem("assignUser");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchLeaveType = async () => {
  try {
    const response = await api.get("/leaves/get-leave-type");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const addLeaveType = async (obj) => {
  try {
    const response = await api.post("/leaves/add-leave-type", obj);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getLeaveStatus = async () => {
  try {
    const response = await api.post("/leaves/get-leave-status", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const leaveApproval = async (obj) => {
  try {
    const response = await api.post("/leaves/leave-approval", obj);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchProjectData = async () => {
  try {
    const response = await api.get("/projects/get-projects-all", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchProjectDetails = async (projectId) => {
  try {
    const response = await api.post("/projects/get-project-details", {
      projectId: projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
  }
};

const getProjectsAll = async () => {
  try {
    const response = await api.get("/projects/get-projects-all", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

const getTimesheetData = async () => {
  try {
    const response = await api.post("/timesheets/get-timesheet", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getProjects = async () => {
  try {
    const response = await api.get("/projects/get-projects-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getExpenseData = async () => {
  try {
    const response = await api.post("/expences/get-all-expences", {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getMyexpense = async () => {
  try {
    const userId = await AsyncStorage.getItem("assignUser");
    const response = await api.post("/api/expences/get-all-expences", {
      userId: userId,
    });
    return response.data;
    // setData(response.data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getPayroll_logs = async (month_year) => {
  try {
    const response = await api.post("/payroll/salary-log-report", {
      salaryYearMonth: month_year,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const get_mypayslip = async (obj) => {
  try {
    const userId = await AsyncStorage.getItem("assignUser");
    console.log(obj);
    const response = await api.post("/payroll/get-payslip", {
      salaryYearMonth: obj.salaryYearMonth,
      userId: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export {
  api,
  setToken,
  login,
  getUserDetails,
  getSideMenu,
  getDashboardDetails,
  getEmployeeDetails,
  getAllEmployees,
  getClients,
  addClient,
  getCompanyBranch,
  addCompanyBranch,
  getcompanyData,
  geteducationData,
  getLanguageData,
  getLeaveData,
  fetchLeaveType,
  getLeaveStatus,
  fetchProjectData,
  fetchProjectDetails,
  getProjectsAll,
  getTimesheetData,
  getProjects,
  getExpenseData,
  getMyexpense,
  getPayroll_logs,
  get_mypayslip,
  leaveApproval,
  addLeaveType,
};
