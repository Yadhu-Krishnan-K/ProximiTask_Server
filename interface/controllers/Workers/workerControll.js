import WorkerRepository from "../../repositories/WorkerRepository.js";
import SignUp from "../../../domain/usecases/Workers/SignUp.js";
import Login from "../../../domain/usecases/Workers/Login.js";
import CustomError from "../../../config/CustomError.js";
import jwt from "../../../utils/jwt.js";
const workerRepository = new WorkerRepository();

const signup = async (req, res, next) => {
    console.log('Reached worker controller');
    const workerData = req.body;
    console.log('workerData = ', workerData);
    try {
        const worker = new SignUp(workerRepository);
        const data = await worker.execute(workerData); // Await the result of async call
        return res.status(201).json({ success: true, workerData });
    } catch (error) {
        next(new CustomError(error.message, 500));  // Pass error to centralized handler
    }
};

const getAllWorkers = async (req, res, next) => {
    try {
        const workerList = await workerRepository.findWorkers();
        return res.status(200).json({ success: true, list: workerList });
    } catch (error) {
        next(new CustomError('Failed to fetch worker list', 500));  // Pass error to centralized handler
    }
};

const accessControll = async (req, res, next) => {
    const { worker_id } = req.body;
    try {
        const worker = await workerRepository.access(worker_id);
        if (worker) {
            return res.status(201).json({ success: true });
        } else {
            throw new CustomError('Worker not found', 404);
        }
    } catch (error) {
        next(new CustomError(error.message, 500));  // Pass error to centralized handler
    }
};

const deleteWorker = async (req, res, next) => {
    const worker_id = req.params.id;
    console.log('workerID = ', worker_id);
    try {
        const done = await workerRepository.deleteWorker(worker_id);
        if (done) {
            return res.status(201).json({ success: true });
        } else {
            throw new CustomError('Failed to delete worker', 500);
        }
    } catch (error) {
        next(new CustomError(error.message, 500));  // Pass error to centralized handler
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const refreshToken = jwt.generateRefreshToken(email,'worker');
        const accessToken = jwt.generateAccessToken(password,'worker');
        const UserLoginUseCase = new Login(workerRepository);
        const worker = await UserLoginUseCase.execute({ email, password });
        console.log('worker when logging in ===== ', worker);
        return res.status(200).json({ success: true, worker,refreshToken,accessToken });
    } catch (error) {
        next(new CustomError(error.message, 500));  // Pass error to centralized handler
    }
};

const changeStatus = async(req,res,next)=>{
    const worker_id = req.params.id;
    console.log('workerID = ', worker_id);
    try {
        const worker = await workerRepository.statusChange(worker_id);
        return res.status(200).json({success:true})
    } catch (error) {
        next(error)
    }
}

export { signup, getAllWorkers, accessControll, deleteWorker, login, changeStatus };
