const lightPink = '#DB6865';

export const EditItemStyles = {

    editItemContainer: {
        fontFamily: 'Josefin Sans',
        margin: '1em 0 0 1em',
    },

    labels: {
        textTransform: 'uppercase',
        letterSpacing: '.025em',
        color: lightPink,
    },

    selectOptions: {
        fontSize: '1em',
    },

    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    btn: {
        color: 'white',
        margin: '1em 1em 0 0',
        backgroundColor: '#336176',
        border: '.15em solid #336176',
        borderRadius: '.25em',
        height: '3em',
        textTransform: 'uppercase',
        letterSpacing: '.15em',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            textDecoration: 'none',
            color: lightPink,
        }
    },

    btnLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '.5em',
        maxWidth: '8em',
        margin: '1em 0 0 0',
        '&:hover': {
            textDecoration: 'none',
            color: lightPink,
        }
    },

};