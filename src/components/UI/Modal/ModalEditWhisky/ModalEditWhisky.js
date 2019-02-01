import React from 'react';
import classes from '../Modal.css';
import InputModal from './InputModal/InputModal';
import Spinner from '../../Spinner/Spinner';

const ModalGame = (props) => {
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    let inputs;
    let nextPage=null;

    if (props.state.loadingData) {
        inputs=<Spinner />;
    } else {
        const activePage = (path) => {
            return props.state.currentPage === path.toString();
        };
            
        inputs = Object.keys(props.state.whisky)
            .map(key => {
                return [
                    <div className={classes.Img}>
                        <p><img
                            key={key}
                            src={props.state.whisky[key]['img']}
                            alt="whisky_img" />
                        </p>
                    </div>,
                    Object.keys((props.state.whisky[key]))
                        .map(key2 => {
                            return (
                                <div className={classes.Input}>
                                    <InputModal
                                        key={key+key2}
                                        changeValue={props.state.changeValue[key][key2]}
                                        value={props.state.value[key][key2]}
                                        name={key2} inputName={capitalize(key2)}
                                        id={key}
                                        change={props.change}
                                        edit={props.edit} />
                                </div>
                            );
                        })
                ]
            });
        nextPage=[];
        let page=0;
        for (let i=0; i<props.state.pages; i++) {
            page++;
            nextPage.push(<a
                key={page}
                className={activePage(page) ? classes.Active : null}
                href={'?'+page}>{page}
            </a>);
        }
    }

    return (
        <React.Fragment>
            <div className={classes.EditWhisky}>
                {inputs}
                <div className={classes.Pagination}>
                    {nextPage}
                </div>
            </div>
        </React.Fragment>
    );
};

export default ModalGame;