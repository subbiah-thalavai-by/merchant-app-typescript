/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function BootstrapTooltip(props: JSX.IntrinsicAttributes & TooltipProps) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} placement="right" />;
}
