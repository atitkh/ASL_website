import React, { useEffect, useState } from 'react';
import './home.css';
import './loader.css'
import { Gallery, GalleryModal } from '../../components';
import axios from 'axios';
import { GitHub, LinkedIn, Language, SearchOffOutlined, Search } from "@mui/icons-material"
import { Box, Button, Divider, Group, Image, Input, ScrollArea, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SnapAR from '../snap/SnapAR';

function Home() {
    const [opened, { open, close }] = useDisclosure(false);
    const [currentItem, setCurrentItem] = useState({});

    const [mainTitle, setMainTitle] = useState('')
    const [socialLinks, setSocialLinks] = useState([])
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState('All')
    const [portfolioData, setPortfolio] = useState([])
    const [loading, setLoading] = useState(true)

    const [session, setSession] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [startAR, setStartAR] = useState(true);

    const [search, setSearch] = useState('')
    const [alphabets, setAlphabets] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
    const [alphabetsSearch, setAlphabetsSearch] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))

    const handleClose = () => {
        close();
        setCurrentItem({});
        setStartAR(false);
        if (session) {
            session.pause();
        }// pause the session
        if (mediaStream) {
            // mediaStream.getVideoTracks().forEach(track => track.stop()); setMediaStream(null);
        } // stop all tracks
    };

    const handleOpen = () => {
        open();
        setStartAR(true);
        if (session) {
            session.play();
        }
        if (mediaStream) {
            // mediaStream.getVideoTracks().forEach(track => track.play());
        }
    };

    const handleSession = (session, mediaStream) => {
        if (session) {
            setSession(session);
        }
        if (mediaStream) {
            setMediaStream(mediaStream);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            setAlphabetsSearch(alphabets);
        } else {
            let word = e.target.value.toUpperCase();
            let result = word.split('');
            setAlphabetsSearch(result);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://api.atitkharel.com.np/portfolio/atit/')
            setMainTitle(result.data.title);
            setSocialLinks(result.data.social_links);
            setCategories(result.data.main_categories);
            setPortfolio(result.data.portfolio);
            setLoading(false);
        }
        fetchData();
    }, [])

    if (loading) {
        return (
            <div className="loader-container">
                <div className="wrapper">
                    <span className="circle circle-1"></span>
                    <span className="circle circle-2"></span>
                    <span className="circle circle-3"></span>
                    <span className="circle circle-4"></span>
                    <span className="circle circle-5"></span>
                    <span className="circle circle-6"></span>
                    <span className="circle circle-7"></span>
                    <span className="circle circle-8"></span>
                </div>
            </div>
        );
    }
    else {
        return (
            // set page title
            document.title = 'American Sign Language',

            // main page
            <div className='home'>
                <div className="home_head">
                    <div className="home_head_name">
                        <h1>{mainTitle}</h1>
                    </div>
                    <div className="home_head_links">
                        <Tooltip label="Coming Soon" withArrow>
                            <Button
                                variant="outline"
                                style={{ marginRight: '1rem' }}
                            // onClick={() => window.location.href = '/vr'}
                            >
                                TRY IN VR
                            </Button>
                        </Tooltip>
                        <a href={socialLinks.github} target="_blank" rel="noreferrer"><h1><GitHub fontSize='large' /></h1></a>
                        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><h1><LinkedIn fontSize='large' /></h1></a>
                        <a href={socialLinks.website} target="_blank" rel="noreferrer"><h1><Language fontSize='large' /></h1></a>
                    </div>
                </div>
                {/* <div className="home_categories">
                    {categories.map((item, index) => (
                        <div><p onClick={() => setCurrentCategory(item)} className={currentCategory === item ? 'active' : 'inactive'}>{item}</p></div>
                    ))}
                </div> */}
                <div className='home_gallery'>
                    <Group position='center'>
                        <Group position="center">
                            <Stack direction="horizontal" spacing="xs">
                                <div id='canvas' style={{
                                    maxWidth: '320px',
                                    maxHeight: '570px',
                                    // marginRight: isMobile ? '0' : '1rem',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 0 0.5rem 0 rgba(0, 0, 0, 0.2)',
                                }} >
                                    <SnapAR lensID={process.env.REACT_APP_ASL_LENS_ID} handleSessionExport={handleSession} />
                                </div>
                                <Button
                                    onClick={() => handleOpen()}
                                    disabled={startAR}
                                    color='green'
                                >Start</Button>
                                <Button
                                    onClick={() => handleClose()}
                                    disabled={!startAR}
                                    color='red'
                                >Stop</Button>
                            </Stack>
                        </Group>

                        <Group position="center" style={{ flex: 1 }}>
                            <Box
                                style={{
                                    marginRight: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 0 0.5rem 0 rgba(0, 0, 0, 0.2)',
                                    minWidth: '500px',
                                    maxWidth: '500px',
                                    minHeight: '700px',
                                    padding: '1rem',
                                }}
                            >
                                <Text color='black' size={'xl'}>CHEAT SHEET</Text>

                                <Divider color='black' size={'xl'} />

                                <Input
                                    placeholder="Search Letter or Word"
                                    variant="filled"
                                    style={{ margin: '1rem' }}
                                    icon={<Search />}
                                    value={search}
                                    onChange={(e) => handleSearch(e)}
                                />

                                <Text color='black' size={'xl'}>Alphabet Signs</Text>

                                <Divider color='black' size={'xl'} />

                                <ScrollArea h={'550px'}>
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                        {alphabetsSearch.map((item) => (
                                            <Stack align="center" style={{ margin: '1rem' }}>
                                                {item === ' ' ? null : <Image src={process.env.PUBLIC_URL + `/signs/${alphabets.indexOf(item)}.png`} width={100} height={100} />}
                                                <Text color='black' size={'xl'}>{item}</Text>
                                            </Stack>
                                        ))}
                                    </div>
                                </ScrollArea>

                            </Box>
                        </Group>
                    </Group>
                </div>
                <div className="home_footer">
                    <a href="https://kerkarcreations.com/" target="_blank" rel="noreferrer">
                        <p>©  {new Date().getFullYear()}   Kerkar Creations</p>
                    </a>
                </div>
            </div>
        );
    }
}

export default Home;