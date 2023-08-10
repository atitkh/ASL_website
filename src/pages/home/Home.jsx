import React, { useEffect, useState } from 'react';
import './home.css';
import './loader.css'
import axios from 'axios';
import { Search } from "@mui/icons-material"
import { ActionIcon, Box, Button, Group, Image, Input, ScrollArea, Stack, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import SnapAR from '../snap/SnapAR';
import { IconBrandGithub, IconBrandSnapchat, IconInfoCircle, IconInfoSquare } from '@tabler/icons-react';

function Home() {
    const [loading, setLoading] = useState(true);

    const isMobile = useMediaQuery("(max-width: 50rem)");
    const theme = useMantineTheme();

    const [session, setSession] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [startAR, setStartAR] = useState(true);

    const [search, setSearch] = useState('')
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [alphabetsSearch, setAlphabetsSearch] = useState(['ABCDEFGHIJKLMNOPQRSTUVWXYZ'])

    const handleClose = () => {
        setStartAR(false);
        if (session) {
            session.pause();
        }// pause the session
        if (mediaStream) {
            // mediaStream.getVideoTracks().forEach(track => track.stop()); setMediaStream(null);
        } // stop all tracks
    };

    const handleOpen = () => {
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
        // only accept alphabets or empty string or string + space
        if (e.target.value === '' || /^[a-zA-Z ]*$/.test(e.target.value)) {
            setSearch(e.target.value);
            if (e.target.value === '') {
                setAlphabetsSearch(['ABCDEFGHIJKLMNOPQRSTUVWXYZ']);
            } else {
                let word = e.target.value.toUpperCase();
                let words = word.split(' ');
                setAlphabetsSearch(words);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://api.atitkharel.com.np/portfolio/atit/')
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
            <div className='home' style={{ backgroundColor: theme.colors[theme.primaryColor][1] }}>
                <div className="home_head" style={{ backgroundColor: '#1C94D9' }}>
                    <div className="home_head_icon">
                        <Image src={process.env.PUBLIC_URL + `/images/ASL.png`} height={'auto'} width={'150'} />
                    </div>

                    <div className="home_head_name">
                        {isMobile ? null : <h1>American Sign Language</h1>}
                    </div>

                    <div className="home_head_links">
                        <Tooltip label="Try on Snapchat" withArrow>
                            <a href='https://lens.snapchat.com/17e9115780384a2288fe14f54d7e1b54' target="_blank" rel="noreferrer"><h1><IconBrandSnapchat size={'30px'} /></h1></a>
                        </Tooltip>
                        <a href='https://github.com/atitkh' target="_blank" rel="noreferrer"><h1><IconBrandGithub size={'30px'} /></h1></a>
                    </div>
                </div>

                <div className='home_body' style={{ flexDirection: isMobile ? 'column' : 'row', padding: isMobile ? '0' : '1% 0' }}>
                    <Stack direction="horizontal" spacing="xs" style={{
                        flex: '1',
                        borderRadius: '0.5rem',
                        boxShadow: '0 0 0.5rem 0 rgba(0, 0, 0, 0.2)',
                        padding: '1rem',
                        minWidth: '320px',
                        maxWidth: '320px',
                        margin: isMobile ? '1rem' : '1rem 3rem 1rem 1rem',
                        // backgroundColor: theme.colors[theme.primaryColor][2]
                        backgroundColor: '#1C94D9'
                    }}>
                        <div id='canvas' style={{
                            minWidth: '320px',
                            maxHeight: '570px',
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

                    <Group position="center" style={{
                        flex: '2',
                        padding: '1rem',
                    }}>
                        <Box
                            style={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                boxShadow: '0 0 0.5rem 0 rgba(0, 0, 0, 0.2)',
                                width: isMobile ? '350px' : '100%',
                                maxWidth: '1000px',
                                height: '100%',
                                padding: '1rem',
                                margin: '1rem',
                                // backgroundColor: theme.colors[theme.primaryColor][2]
                                backgroundColor: '#1C94D9'
                            }}
                        >
                            <Text color='black' weight={'600'} align='center' size={'xl'}>CHEAT SHEET</Text>

                            <Input
                                placeholder="Search Letter or Word"
                                variant="filled"
                                style={{ margin: '1rem 2.25rem' }}
                                icon={<Search />}
                                value={search}
                                onChange={(e) => handleSearch(e)}
                                rightSection={
                                    <ActionIcon onClick={() => setSearch('')}><IconInfoCircle /></ActionIcon>
                                }
                            />

                            <ScrollArea h={'565px'} styles={(theme) => ({
                                scrollbar: {
                                    '&, &:hover': {
                                        background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#4dbbfa',
                                        borderRadius: theme.radius.sm,
                                    },

                                    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                                        backgroundColor: '#1c94d9',
                                    },

                                    '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                                        backgroundColor: '#1c94d9',
                                    },
                                }
                            })}
                            >
                                {alphabetsSearch.map((item1) => (
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', whiteSpace: 'pre-wrap' }}>
                                        {item1.split('').map((item) => (
                                            <Stack align="center" style={{ margin: '1rem', backgroundColor: '#4dbbfa', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                                <>
                                                    <Image src={process.env.PUBLIC_URL + `/images/signs/${alphabets.indexOf(item)}.png`} width={100} height={100} />
                                                    <Text color='black' size={'xl'}>{item}</Text>
                                                </>
                                            </Stack>
                                        ))}
                                    </div>
                                ))}
                            </ScrollArea>

                        </Box>
                    </Group>
                </div>
                <div className="home_footer">
                    <a href="https://kerkarcreations.com/" target="_blank" rel="noreferrer">
                        <p>©  {new Date().getFullYear()}  Kerkar Creations</p>
                    </a>
                </div>
            </div >
        );
    }
}

export default Home;