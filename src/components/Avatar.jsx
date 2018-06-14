import React from 'react';
import PropTypes from 'prop-types';
import MUIAvatar from '@material-ui/core/Avatar';
import getColor from '../utils/color-from';
import titleInitials from '../utils/title-initials';

const Avatar = ({ children, colorFrom, ...rest }) => (
  <MUIAvatar style={{ backgroundColor: getColor(colorFrom) }} {...rest}>
    {titleInitials(children)}
  </MUIAvatar>
);

Avatar.propTypes = {
  children: PropTypes.string.isRequired,
  colorFrom: PropTypes.string.isRequired,
};
export default Avatar;
