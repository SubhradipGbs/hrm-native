export const menuData = [
    {
        "_id": "6479de0a28a1626f19936598",
        "name": "Dashboard",
        "icon": "fas fa-tachometer-alt nav-icon",
        "path": "/",
        "userRole": [
            1,
            2,
            3
        ],
        "child": []
    },
    {
        "_id": "6479df2128a1626f1993659e",
        "name": "Leave Management",
        "icon": "fa-solid fa-plane-departure nav-icon",
        "userRole": [
            1,
            2,
            3
        ],
        "child": [
            {
                "_id": "6479df7728a1626f199365a1",
                "name": "Manage Leave",
                "icon": "fa-solid fa-clock nav-icon",
                "path": "/manageleave",
                "userRole": [
                    1
                ]
            },
            {
                "_id": "647d84cd3ef72339cc863369",
                "name": "Leaves Types",
                "icon": "fa-solid fa-diagram-project nav-icon",
                "path": "/leavetype",
                "userRole": [
                    1,
                    2
                ]
            }
        ]
    },
    {
        "_id": "647d852e3ef72339cc86336c",
        "name": "Company Details",
        "icon": "fas fa-building-wheat nav-icon",
        "userRole": [
            1,
            2
        ],
        "child": [
            {
                "_id": "647d85893ef72339cc86336f",
                "name": "Company Structure",
                "icon": "fas fa-solid fa-users nav-icon",
                "path": "/company",
                "userRole": [
                    1,
                    2
                ]
            },
            {
                "_id": "647d85b43ef72339cc863373",
                "name": "Masters",
                "icon": "fa-solid fa-pen-to-square nav-icon",
                "path": "/masters",
                "userRole": [
                    1
                ]
            },
            {
                "_id": "6487fafc6b0855954accba44",
                "name": "Clients",
                "icon": "fa-solid fa-address-book nav-icon",
                "path": "/clients",
                "userRole": [
                    1,
                    2
                ]
            }
        ]
    },
    {
        "_id": "647d85dc3ef72339cc863376",
        "name": "Employee",
        "icon": "fas fa-solid fa-users nav-icon",
        "userRole": [
            1,
            2,
            3
        ],
        "child": [
            {
                "_id": "647d86113ef72339cc863379",
                "name": "Employees",
                "icon": "fas fa-user-tie nav-icon",
                "path": "/employee",
                "userRole": [
                    1,
                    2,
                    3
                ]
            },
            {
                "_id": "65f3f8bf3a8ec3555533b479",
                "name": "Employee Report",
                "icon": "fa-solid fa-clipboard-user nav-icon",
                "path": "/emp-report",
                "userRole": [
                    1
                ]
            }
        ]
    },
    {
        "_id": "647d867d3ef72339cc863380",
        "name": "Expense Management",
        "icon": "fa-solid fa-calculator nav-icon",
        "userRole": [
            1,
            2,
            3
        ],
        "child": [
            {
                "_id": "647d86a23ef72339cc863383",
                "name": "Claim Expenses",
                "icon": "fa-solid fa-sack-dollar nav-icon",
                "path": "/expenses",
                "userRole": [
                    1,
                    2,
                    3
                ]
            },
            {
                "_id": "647d87093ef72339cc863387",
                "name": "Expense Report",
                "icon": "fas fa-solid fa-clipboard-check nav-icon",
                "path": "/expense-report",
                "userRole": [
                    1,
                    2
                ]
            },
            {
                "_id": "647dbfb102af1f7ebf9aceb2",
                "name": "My Expenses",
                "icon": "fa-solid fa-hourglass-half nav-icon",
                "path": "/my-expenses",
                "userRole": [
                    1,
                    2,
                    3
                ]
            }
        ]
    },
    {
        "_id": "647d874b3ef72339cc86338a",
        "name": "Time Management",
        "icon": "fa-solid fa-stopwatch nav-icon",
        "userRole": [
            1,
            2,
            3
        ],
        "child": [
            {
                "_id": "647d87873ef72339cc86338d",
                "name": "Projects",
                "icon": "fa-solid fa-diagram-project nav-icon",
                "path": "/projects",
                "userRole": [
                    1,
                    2,
                    3
                ]
            },
            {
                "_id": "647d87ac3ef72339cc863391",
                "name": "Own Timesheet",
                "icon": "fa-solid fa-pen-to-square nav-icon",
                "path": "/timesheet",
                "userRole": [
                    1,
                    2,
                    3
                ]
            },
            {
                "_id": "647d88373ef72339cc8633b6",
                "name": "View Timesheet",
                "icon": "fa-solid fa-pen-to-square nav-icon",
                "path": "/view-timesheet",
                "userRole": [
                    1,
                    2,
                    3
                ]
            }
        ]
    },
    {
        "_id": "6482e61d55b373fa2eccfa73",
        "name": "Payroll",
        "icon": "fa-solid fa-plane-departure nav-icon",
        "userRole": [
            1,
            2,
            3
        ],
        "child": [
            {
                "_id": "6482e63b55b373fa2eccfa76",
                "name": "My Salary details",
                "icon": "fa-solid fa-hourglass-half nav-icon",
                "path": "/my-payslip",
                "userRole": [
                    1,
                    2,
                    3
                ]
            },
            {
                "_id": "6482fe3cfffa1eff2ce5e17d",
                "name": "Employee Payslips",
                "icon": "fa-solid fa-calendar nav-icon",
                "path": "/emp-payslip",
                "userRole": [
                    1
                ]
            },
            {
                "_id": "6483168a0d5da592993e4d12",
                "name": "Payroll Masters",
                "icon": "fa-solid fa-network-wired nav-icon",
                "path": "/payroll-masters",
                "userRole": [
                    1,
                    2
                ]
            },
            {
                "_id": "65f7e67f3a8ec3555533be44",
                "name": "Payroll Logs",
                "icon": "fa-solid fa-clipboard-check nav-icon",
                "path": "/payroll-logs",
                "userRole": [
                    1
                ]
            }
        ]
    }
]