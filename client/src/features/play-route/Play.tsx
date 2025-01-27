import React, { useEffect, useState } from "react";
import * as R from "ramda";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setCurrentGame } from "../game/gameSlice";
import {
  dequeueOrDismissGameStateModalForGame,
  joinGameById,
  markGameAsSeen,
} from "../gamelist/gamelistActions";
import GameBoard from "../game/GameBoard";
import CopyToClipboard from "../../presentational/CopyToClipboard";
import NicknameModal from "../user/NicknameModal";
import { useAppSelector } from "../../app/hooks";
import { initiateReplay } from "../game/gameActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faPlay,
  faPlayCircle,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import Button from "../../presentational/Button";
import GameStateModal from "../game/GameStateModal";

const Play: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useSelector((state: RootState) =>
    id ? state.gamelist.games[id] : null
  );
  const gamesLoaded = useSelector(
    (state: RootState) => state.gamelist.gamesLoaded
  );
  const currentUser = useSelector((state: RootState) => state.user.user);
  const replayState = useAppSelector((state) =>
    Boolean(state.game.replay.move)
  );
  const currentReplayIndex = useAppSelector(
    (state) => state.game.replay.moveListIndex
  );
  const gameStateModal = useAppSelector((state) => state.game.gameStateModal);

  const [fourohfour, setFourohfour] = useState(false);

  const userIndex =
    game && currentUser
      ? game.users.findIndex((val) => val === currentUser.id)
      : null;

  useEffect(() => {
    if (id) {
      console.log("set current game", id);
      dispatch(setCurrentGame(id));
      dispatch(markGameAsSeen(id));
    }
    return () => {
      dispatch(setCurrentGame(null));
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (gamesLoaded && !game && id) {
      // @ts-ignore
      dispatch(joinGameById(id)).then((joinedGame) => {
        console.log("joinedGame :", joinedGame);
        if (!joinedGame) {
          setFourohfour(true);
        }
      });
    } else {
      setFourohfour(false);
    }
  }, [id, dispatch, game, gamesLoaded]);

  const nickModal =
    currentUser && !currentUser.nickname ? <NicknameModal /> : null;

  if (fourohfour) {
    return (
      <div className="flex flex-auto flex-col h-screen justify-center items-center">
        <h1>404</h1>
        <Link className="underline text-blue-700" to="/">
          home
        </Link>
      </div>
    );
  }

  if (game && game.users.length === 1) {
    return (
      <div className="flex flex-auto flex-col overflow-auto lg:h-screen justify-center items-center py-12 px-4">
        <div className="max-w-full flex-shrink-0 bg-darkbg flex flex-col justify-center items-center text-center p-8 rounded-xl mb-5">
          <h2 className="text-2xl flex-wrap">
            Invite an opponent to start the game
          </h2>
          <span>they can use this link to join you</span>
          <a
            className="underline text-blue-700 text-sm break-words"
            href={window.location.toString()}
          >
            {window.location.toString()}
          </a>
          <div>
            <CopyToClipboard
              label="Copy link"
              text={window.location.toString()}
            />
            {navigator.share && (
              <Button
                onClick={() => {
                  navigator.share?.({
                    url: window.location.toString(),
                  });
                }}
              >
                Share <FontAwesomeIcon icon={faShare} />{" "}
              </Button>
            )}
          </div>
        </div>
        <div className=" bg-darkbg rounded-xl text-center">
          <h2 className="text-2xl">Watch the tutorial</h2>
          <span>in the mean time</span>
          <iframe
            style={{
              maxWidth: "100%",
              width: "560px",
            }}
            height="315"
            src="https://www.youtube.com/embed/MwULUSGQ9oo"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-darkbrown border-2 rounded-lg"
          ></iframe>
        </div>
        {nickModal}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-auto flex-col lg:flex-row">
      {game && id && userIndex !== null && (
        <GameBoard id={id} game={game} userIndex={userIndex} />
      )}
      {game && id && (
        <div className="m-auto lg:m-0 flex-shrink-0 w-[200px] pt-2 lg:max-h-screen overflow-y-auto">
          <div className="flex flex-shrink-0 items-center text-darkbrown">
            <FontAwesomeIcon
              className={classNames(
                "mr-1 text-xl",
                replayState && "text-blue-500"
              )}
              icon={replayState ? faPlayCircle : faHistory}
            />
            <h3 className="flex-auto">
              <span className="text-2xl font-bold m-0">Turns</span>
            </h3>
          </div>
          <ul className="">
            {R.reverse(game.moves).map((move, i) => {
              const index = game.moves.length - i - 1;
              return (
                <li key={index} className="flex">
                  <button
                    type="button"
                    className={classnames(
                      "flex-auto p-1 font-bold text-center rounded-md m-1 inset-shadow hover:bg-opacity-70",
                      move.player === 0 ? "bg-p1" : "bg-p2",
                      replayState &&
                        currentReplayIndex === index &&
                        "bg-blue-400 text-white"
                    )}
                    onClick={() => {
                      dispatch(initiateReplay(index));
                    }}
                  >
                    {replayState && currentReplayIndex === index && (
                      <FontAwesomeIcon className="mr-2" icon={faPlay} />
                    )}
                    {move.letters.join("").toUpperCase()}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {nickModal}
      {gameStateModal && id && (
        <GameStateModal
          {...gameStateModal}
          onDismiss={() => dispatch(dequeueOrDismissGameStateModalForGame(id))}
        />
      )}
    </div>
  );
};

export default Play;
