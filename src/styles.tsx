import { useEffect, useState } from 'react'

const Styles: { [key: string]: React.CSSProperties } = {
  main: {
    padding: '20px',
    maxWidth: '80%',
    margin: '0 auto'
  },
  label: {
    fontSize: '20px',
    padding: '0.5rem 1rem',
    borderLeft: '4px solid #000',
    marginLeft: '10pt'
  },
  graph: {
    padding: '10px'
  },
  checkcardList: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px',
    justifyContent: 'flex-start'
  },
  text: {
    marginLeft: '0.5em',
    cursor: 'pointer'
  },
  checkcard: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    borderRadius: '24px',
    border: 'solid 2px',
    padding: '5px',
    margin: '0.5rem'
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem'
  },
  dropdown: {
    padding: '0.5rem',
    fontSize: '16px'
  }
}

export const useResponsiveStyles = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 768
  return {
    main: {
      ...Styles.main,
      maxWidth: isMobile ? '100%' : '60%',
      padding: isMobile ? '10px' : '20px'
    },
    label: {
      ...Styles.label,
      fontSize: isMobile ? '16px' : '20px',
      padding: isMobile ? '0.5rem' : '0.5rem 1rem'
    },
    graph: {
      ...Styles.graph,
      padding: isMobile ? '5px' : '10px'
    },
    populationSwitch: {
      ...Styles.populationSwitch,
      padding: isMobile ? '5px 0' : '10px',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    checkcardList: {
      ...Styles.checkcardList,
      padding: isMobile ? '5px 0' : '10px',
      justifyContent: isMobile ? 'center' : 'flex-start' // モバイルで中央揃え
    },
    checkcard: {
      ...Styles.checkcard,
      justifyContent: isMobile ? 'center' : 'flex-start', // モバイルで中央揃え
      width: isMobile ? '25%' : '12%',
      padding: isMobile ? '3px' : '5px'
    },
    text: {
      ...Styles.text,
      marginLeft: isMobile ? '0.50px' : '0.5em',
      cursor: 'pointer'
    },
    dropdownContainer: {
      ...Styles.dropdownContainer,
      justifyContent: isMobile ? 'center' : 'flex-end'
    },
    dropdown: {
      ...Styles.dropdown,
      padding: isMobile ? '5px' : '5px'
    }
  }
}

export default Styles
