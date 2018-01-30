export default {
  root: {
    padding: 20,
    position: 'relative',
  },
  title: {
    marginBottom: 20,
  },
  selectItem: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  replyButton: {
    position: 'absolute',
    right: 30,
    bottom: 20,
    opacity: 0.3,
    transition: 'opacity .3s',
    '&:hover': {
      opacity: '1',
    },
  },
}
