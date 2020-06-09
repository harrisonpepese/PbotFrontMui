import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { AppBar, Toolbar, Typography, Grid, Paper } from '@material-ui/core';
import Link from 'next/link'

const useStyles = makeStyles({
  appBarItens: {
    padding: theme.spacing(1)
  },
  content:{
    flexGrow: 1,
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(2)
  }
})

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const classes = useStyles();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/*<AppBar position="static" color="primary">
          <Toolbar >
            <Link href="/">
              <Typography className={classes.appBarItens} variant="h6" >Pbot</Typography>
            </Link>
            <Link href="/fluxo">
              <Typography className={classes.appBarItens} variant="h6">Fluxos</Typography>
            </Link>
          </Toolbar>
  </AppBar>*/}
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Grid container className={classes.content}>
          <Grid item xs={12} sm={11} md={10} lg={9} xl={8}>
            <Paper elevation={3}>
              <Component {...pageProps} />
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
