import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../actions/followerGroupsActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form';
import TextField from './FormComponents/TextField';
import navigationInfoSelector from '../selectors/navigationSelector';

const {PropTypes} = React;

class EditFollowerGroupModal extends Component {
    static propTypes: {
        editMode: PropTypes.bool,
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const editCfg = {
            title: 'Edit Follower Group',
            doneBtn: 'Update'
        };

        const newCfg = {
            title: 'Create Follower Group',
            doneBtn: 'Create'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.cfg = props.editMode ? editCfg : newCfg;
    }

    handleClose() {
        this.props.onClose();
    }

    handleSubmit(formData) {
        if (this.props.editMode)
            this.props.update({...formData, id: this.props.followerGroupId});
        else
            this.props.create(formData);

        this.props.onClose();
    }

    renderModalButtons() {
        return [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                onTouchTap={this.props.handleSubmit(this.handleSubmit)}
                label={this.cfg.doneBtn}
                primary={true}
                keyboardFocused={true}
                className='create-followerGroup-btn'
            />
        ];
    }

    renderRegisterControls() {
        return [
            <Field type='password'
                placeholder='Password'
                name='password'
                component={TextField} />
            //     ,

            // <Field name='clinic'
            //        label='Clinic'
            //        required={true}
            //        component={SelectField}>
            // {
            //     this.props.clinics.map((clinic, idx) => (
            //         <MenuItem
            //             className={`select-clinic-option-${idx}`}
            //             value={clinic.id}
            //             primaryText={clinic.name}
            //         />
            //     ))
            // }
            // </Field>
        ];
    }

    renderForm() {
        return (
            <form autoComplete='off'>
                <Field type='text'
                       placeholder='Group Name'
                       name='group_name'
                       component={TextField} />


               {!this.props.editMode && this.renderRegisterControls()}
            </form>
        );
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                title={this.cfg.title}
                modal={false}
                actions={this.renderModalButtons()}
                className='edit-followerGroup-modal'
            >
                {this.renderForm()}
            </Dialog>
        );
    }
}

let Form = reduxForm({
    form: 'editFollowerGroup',
    validate: (formData) => {
        const errors = {};

        if (!formData.name)
            errors.name = 'Required';

        if (!formData.password)
            errors.password = 'Required'

        // if (!formData.clinic)
        //     errors.clinic = 'Required';

        return errors;
    }
})(EditFollowerGroupModal);

function mapStateToProps(state) {
    const {modalProps: {followerGroupId, editMode}} = navigationInfoSelector(state);
    const followerGroup = _.find(state.followerGroups.followerGroups, f => f.id === followerGroupId);
    const clinics = state.clinics.clinics;
    const current_clinic_id =  state.leaders.leaders.current_clinic_id;

    const ret = {
        followerGroup,
        clinics,
        editMode
    };

    ret.initialValues = followerGroup ?
        {
            group_name: followerGroup.group_name,
        } :
        {
            clinic: current_clinic_id
        };
    return ret;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        update: actions.update,
        create: actions.create
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
