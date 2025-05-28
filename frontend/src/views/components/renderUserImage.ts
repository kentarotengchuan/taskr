import { User } from "../../types/Model";

export async function renderUserImage(container: HTMLElement | null, user: User): Promise<void> {
    const img = document.createElement('img');
    img.className = 'user-image';
    if (!user.img_path) {
        img.src = 'http://localhost:8000/storage/user_images/emp.png';
    } else {
        img.src = `http://localhost:8000/storage/user_images/${user.img_path}`;
    }
    container!.appendChild(img);
}