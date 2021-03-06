import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import SelectField from './SelectField';
import { MenuItem } from '@material-ui/core';

class ClinicSelect extends Component {
    render() {
        return (
            <Field name='clinic_id'
                   label='Clinic'
                   required={true}
                   component={SelectField}>
            {
                this.props.clinics.map(clinic => (
                    <MenuItem value={clinic.id}>{clinic.name}</MenuItem>
                ))
            }
            </Field>
        );
    }
}

function mapStateToProps(state) {
    return {
        clinics: state.clinics.clinics
    };
}

export default connect(mapStateToProps)(ClinicSelect);
