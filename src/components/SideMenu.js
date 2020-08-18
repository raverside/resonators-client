import { connect } from "react-redux";
import React, { useState } from "react";
import { bindActionCreators } from "redux";
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Drawer,
    Collapse,
    Toolbar,
    makeStyles,
} from "@material-ui/core";
import {
    Weekend,
    ViewList,
    EventNote,
    ExitToApp,
    ExpandLess,
    ExpandMore,
    Group,
    Person,
    DirectionsWalk,
    List as ListIcon,
} from "@material-ui/icons";

import { useBelowBreakpoint } from "./hooks";
import { actions } from "../actions/menuActions";
import navigationSelector from "../selectors/navigationSelector";

const useStyles = makeStyles((theme) => ({
    drawer: {
        minWidth: 250,
        padding: theme.spacing(1),
    },
}));

function SideMenu(props) {
    const classes = useStyles(props);
    const screenSmall = useBelowBreakpoint("sm");

    const [clinicMenuOpen, setClinicMenuOpen] = useState(true);
    const [followerMenuOpen, setFollowerMenuOpen] = useState(true);

    return (
        <Drawer
            open={props.menuOpen}
            variant={screenSmall ? "temporary" : "permanent"}
            classes={{ root: classes.drawer, paper: classes.drawer }}
            PaperProps={{ elevation: 4 }}
            onClose={props.toggleMenu}
        >
            {screenSmall ? null : (
                /* a placeholder to keep the content below the app bar.
                   The drawer must have a separate toolbar placeholder because it has position: fixed.
                   Not required on "mobile" cause then we use the temporary drawer style. */
                <Toolbar />
            )}
            <List>
                {props.user?.isLeader && (
                    <>
                        {props.leader.group_permissions ? (
                            <React.Fragment>
                                <ListItem button onClick={() => setFollowerMenuOpen(!followerMenuOpen)}>
                                    <ListItemIcon>
                                        <DirectionsWalk />
                                    </ListItemIcon>
                                    <ListItemText primary="Followers" />
                                    {followerMenuOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={followerMenuOpen}>
                                    <List style={{ marginLeft: 20 }}>
                                        <ListItem button onClick={() => props.clickMenuItem("followers")}>
                                            <ListItemIcon>
                                                <Person />
                                            </ListItemIcon>
                                            <ListItemText primary="Follower List" />
                                        </ListItem>

                                        <ListItem button onClick={() => props.clickMenuItem("followerGroups")}>
                                            <ListItemIcon>
                                                <Group />
                                            </ListItemIcon>
                                            <ListItemText primary="Follower Groups" />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ) : (
                            <ListItem button onClick={() => props.clickMenuItem("followers")}>
                                <ListItemIcon>
                                    <DirectionsWalk />
                                </ListItemIcon>
                                <ListItemText primary="Followers" />
                            </ListItem>
                        )}
                        <ListItem button onClick={() => setClinicMenuOpen(!clinicMenuOpen)}>
                            <ListItemIcon>
                                <Weekend />
                            </ListItemIcon>
                            <ListItemText primary="Clinic" />
                            {clinicMenuOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={clinicMenuOpen}>
                            <List style={{ marginLeft: 20 }}>
                                <ListItem button onClick={() => props.clickMenuItem("clinics")}>
                                    <ListItemIcon>
                                        <ListIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Clinics List" />
                                </ListItem>
                                <ListItem button onClick={() => props.clickMenuItem("criteriaList")}>
                                    <ListItemIcon>
                                        <EventNote />
                                    </ListItemIcon>
                                    <ListItemText primary="Criteria List" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </>
                )}
                {props.user?.isFollower && (
                    <ListItem button onClick={() => props.clickMenuItem("follower/resonators")}>
                        <ListItemIcon>
                            <ViewList />
                        </ListItemIcon>
                        <ListItemText primary="All Resonators" />
                    </ListItem>
                )}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => props.clickMenuItem("logout")} style={{ color: "#ff4444" }}>
                    <ListItemIcon>
                        <ExitToApp htmlColor="#ff4444" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default connect(
    (state) => ({
        menuOpen: navigationSelector(state).menuOpen,
        leader: state.leaders.leaders,
        user: state.session.user,
    }),
    (dispatch) =>
        bindActionCreators(
            {
                toggleMenu: actions.toggleMenu,
                clickMenuItem: actions.clickMenuItem,
            },
            dispatch
        )
)(SideMenu);
