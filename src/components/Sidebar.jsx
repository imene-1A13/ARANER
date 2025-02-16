import { NavLink } from "react-router-dom";
import { AiFillDashboard, AiOutlineHistory } from "react-icons/ai";
import {
    MdOutlineReportProblem,
    MdOutlineStopCircle,
    MdLogout,
} from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import logo from "../assets/logo2.png";
import styled from "@emotion/styled";
import { useState } from "react";

const Sideb = ({ onLogout }) => {
    const [isDeclarationOfOpen, setIsDeclarationOfOpen] = useState(false);

    const toggleDeclarationOf = (event) => {
        event.preventDefault();
        setIsDeclarationOfOpen((prev) => !prev);
    };

    return (
        <SidebarContainer>
            <img src={logo} className="logo" alt="Logo" />
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/usine"
                            className={({ isActive }) =>
                                isActive ? "link active" : "link"
                            }
                        >
                            <AiFillDashboard /> Usine
                        </NavLink>
                    </li>
                    <li className="sublinks">
                    <NavLink
                to="/#"
                onClick={toggleDeclarationOf}
                className={({ isActive }) =>
                    isActive || isDeclarationOfOpen ? "link active" : "link"
                }
                aria-expanded={isDeclarationOfOpen}
            >
                <RiFileList3Line /> Section
            </NavLink>

            {isDeclarationOfOpen && (
                <ul className="sub-links">
                    <li>
                        <NavLink
                            to="/section/assemblage"
                            className={({ isActive }) =>
                                isActive ? "link active" : "link"
                            }
                        >
                            Assemblage
                        </NavLink>
                    </li>
                    <li>
                        <span className="link disabled">Plaque</span>
                    </li>
                    <li>
                        <span className="link disabled">Charge Finition</span>
                    </li>
                </ul>
            )}
</li>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? "link active" : "link"
                            }
                        >
                            <MdOutlineReportProblem /> Machine
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/historique"
                            className={({ isActive }) =>
                                isActive ? "link active" : "link"
                            }
                        >
                            <AiOutlineHistory /> Historique
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/management"
                            className={({ isActive }) =>
                                isActive ? "link active" : "link"
                            }
                        >
                            <MdOutlineStopCircle /> Manag 4.0
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="logout-container">
                <button
                    onClick={onLogout}
                    className="logout-button"
                    aria-label="Logout"
                >
                    <MdLogout className="logout-icon" />
                    <span>Se déconnecter</span>
                </button>
            </div>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.div`
    width: 250px;
    background-color: #1e1e2f;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
    z-index: 10;
    transition: width 0.3s ease-in-out;

    .logo {
        margin: 0 auto 20px;
        display: block;
        width: 200px;
        height: auto;
    }

    nav {
        flex-grow: 1;
        margin-top: 10px;
    }

    nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    nav ul li {
        margin-bottom: 15px;
    }

    .link {
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
        padding: 12px 15px;
        gap: 1rem;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        font-size: 1rem;
    }

    .link:hover {
        background-color: #2f2f4f;
        color: #ffda01;
    }

    .active {
        background-color: #2f2f4f;
        color: #ffda01;
        font-weight: bold;
        border-left: 5px solid #ffda01;
    }

    .logout-container {
        margin: 20px 0;
    }

    .logout-button {
        width: 100%;
        background-color: #ff4d4d;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .logout-button:hover {
        background-color: #d43f3f;
    }

    .logout-icon {
        font-size: 1.2rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        width: 70px;
        padding: 10px 5px;
        
        .logo {
            width: 50px;
        }

        .link {
            justify-content: center;
            font-size: 0;
        }

        .link svg {
            font-size: 1.5rem;
        }

        .logout-button {
            font-size: 0;
            padding: 8px;
        }

        .logout-icon {
            font-size: 1.5rem;
        }
    }
`;


/* CSS for .content */
export const ContentStyle = `
.content {
  margin-right: 0;
  margin-left: 250px;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #f5f5f5;
}
`;

export default Sideb;
